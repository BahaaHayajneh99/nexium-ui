import { highlightTs } from './ts-highlight';

describe('highlightTs', () => {
  it('colors decorator, class, prop and keyword tokens in a component snippet', () => {
    const source = `@Component({
  selector: 'app-demo-section',
  standalone: true,
  templateUrl: './demo-section.html',
  imports: [NgClass],
})
export class DemoSection {...}`;

    const html = highlightTs(source);

    expect(html).toContain('<span class="language-ts-decorator">@Component</span>');
    expect(html).toContain('<span class="language-ts-prop">selector</span>');
    expect(html).toContain('<span class="language-ts-string">\'app-demo-section\'</span>');
    expect(html).toContain('<span class="language-ts-prop">standalone</span>');
    expect(html).toContain('<span class="language-ts-keyword">true</span>');
    expect(html).toContain('<span class="language-ts-class-name">NgClass</span>');
    expect(html).toContain('<span class="language-ts-keyword">export</span>');
    expect(html).toContain('<span class="language-ts-keyword">class</span>');
    expect(html).toContain('<span class="language-ts-class-name">DemoSection</span>');
  });
});
