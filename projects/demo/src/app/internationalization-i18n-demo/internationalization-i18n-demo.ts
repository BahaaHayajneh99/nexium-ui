import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-internationalization-i18n-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './internationalization-i18n-demo.html',
  styleUrls: ['./internationalization-i18n-demo.scss'],
})
export class InternationalizationI18nDemo {
  commonService = inject(CommonService);

  cliCommands = `# Extract messages from your application
ng extract-i18n

# Build for specific locale
ng build --localize

# Build for specific locales only
ng build --localize --allowed-locale en-US es-ES`;

  i18nFeatures = [
    {
      feature: 'Multi-Language Support',
      description: 'Support multiple languages in your application',
      examples: ['English', 'Spanish', 'French', 'Chinese', 'Arabic']
    },
    {
      feature: 'Translation Management',
      description: 'Centralized translation file management',
      examples: ['i18n files', 'JSON format', 'Lazy loading', 'Dynamic switching']
    },
    {
      feature: 'Locale Detection',
      description: 'Automatic detection of user locale',
      examples: ['Browser language', 'User preference', 'Regional settings']
    },
    {
      feature: 'Content Switching',
      description: 'Seamless switching between languages',
      examples: ['Runtime change', 'No page reload', 'State preservation']
    }
  ];

  setupSteps = [
    'Install @angular/localize package',
    'Configure locale in angular.json',
    'Create i18n translation files (xlf, xliff, or json)',
    'Extract messages from templates using ng extract-i18n',
    'Translate content in locale-specific files',
    'Build for each locale with ng build --localize',
    'Configure routing or server-side detection for locale',
    'Implement language switcher in UI'
  ];

  supportedLocales = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Spanish (Spain)', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
    { code: 'zh-CN', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
    { code: 'ar-SA', name: 'Arabic', flag: '🇸🇦' }
  ];

  translationFormats = [
    {
      format: 'XLIFF (XML)',
      extension: '.xlf',
      pros: 'Angular standard, tool support',
      cons: 'Verbose XML format'
    },
    {
      format: 'JSON',
      extension: '.json',
      pros: 'Lightweight, easy to parse',
      cons: 'Requires custom implementation'
    },
    {
      format: 'MessageFormat',
      extension: '.mf',
      pros: 'Flexible syntax, complex pluralization',
      cons: 'Steeper learning curve'
    }
  ];

  bestPractices = [
    {
      title: 'Use consistent key naming conventions',
      description: 'Use consistent key naming conventions (e.g., app.header.title)'
    },
    {
      title: 'Organize keys by feature or page',
      description: 'Organize keys by feature or page for better maintainability'
    },
    {
      title: 'Provide context comments for translators',
      description: 'Provide context comments for translators'
    },
    {
      title: 'Keep sentences short and context-aware',
      description: 'Keep sentences short and context-aware'
    },
    {
      title: 'Avoid string concatenation; use interpolation',
      description: 'Avoid string concatenation; use interpolation'
    },
    {
      title: 'Test all languages with UI at different screen sizes',
      description: 'Test all languages with UI at different screen sizes'
    },
    {
      title: 'Consider cultural differences in date, time, and number formats',
      description: 'Consider cultural differences in date, time, and number formats'
    },
    {
      title: 'Use professional translators for user-facing content',
      description: 'Use professional translators for user-facing content'
    },
    {
      title: 'Implement analytics to track which languages are used most',
      description: 'Implement analytics to track which languages are used most'
    },
    {
      title: 'Plan for language expansion from the beginning',
      description: 'Plan for language expansion from the beginning'
    }
  ];
}
