// Plain-JS schematic (no imports needed): the factory just returns a Rule, and the Angular CLI
// supplies the Tree and SchematicContext at runtime. Shipping JS directly avoids a separate
// schematics compile step in the library build.

const STYLE_PATH = 'node_modules/nexium-ui/styles.css';

function ngAdd() {
  return (tree, context) => {
    const workspacePath = 'angular.json';
    const buffer = tree.read(workspacePath);

    if (!buffer) {
      context.logger.warn(
        'Could not find angular.json - skipping stylesheet setup. ' +
          `Add "${STYLE_PATH}" to your build "styles" array manually ` +
          '(see https://www.npmjs.com/package/nexium-ui#styles--theming).',
      );
      return tree;
    }

    let workspace;
    try {
      workspace = JSON.parse(buffer.toString());
    } catch {
      context.logger.warn(
        'Could not parse angular.json - skipping stylesheet setup. ' +
          `Add "${STYLE_PATH}" to your build "styles" array manually.`,
      );
      return tree;
    }

    const projects = workspace.projects || {};
    let changed = false;
    let foundApp = false;

    for (const name of Object.keys(projects)) {
      const project = projects[name];
      if (project.projectType && project.projectType !== 'application') {
        continue;
      }
      const build = (project.architect && project.architect.build) || (project.targets && project.targets.build);
      if (!build || !build.options) {
        continue;
      }
      foundApp = true;

      const styles = build.options.styles || (build.options.styles = []);
      const alreadyAdded = styles.some(
        (s) => (typeof s === 'string' ? s : s && s.input) === STYLE_PATH,
      );
      if (alreadyAdded) {
        context.logger.info(`NexiumUI stylesheet already configured for project "${name}".`);
        continue;
      }

      // Insert first so the app's own stylesheets can override NexiumUI styles.
      styles.unshift(STYLE_PATH);
      changed = true;
      context.logger.info(`Added "${STYLE_PATH}" to the "${name}" project's styles.`);
    }

    if (!foundApp) {
      context.logger.warn(
        'No application project with a build target was found in angular.json. ' +
          `Add "${STYLE_PATH}" to your build "styles" array manually.`,
      );
    }

    if (changed) {
      tree.overwrite(workspacePath, JSON.stringify(workspace, null, 2) + '\n');
    }
    return tree;
  };
}

exports.ngAdd = ngAdd;
