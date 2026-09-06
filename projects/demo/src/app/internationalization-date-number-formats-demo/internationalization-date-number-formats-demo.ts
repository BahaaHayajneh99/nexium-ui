import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-internationalization-date-number-formats-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './internationalization-date-number-formats-demo.html',
  styleUrls: ['./internationalization-date-number-formats-demo.scss'],
})
export class InternationalizationDateNumberFormatsDemo {
  commonService = inject(CommonService);

  usageExamples = `<!-- Date formatting with locale -->
<p>{{ today | date: 'long' }}</p>  <!-- January 15, 2024 -->
<p>{{ today | date: 'dd.MM.yyyy' }}</p>  <!-- 15.01.2024 -->

<!-- Number formatting -->
<p>{{ 1234.56 | number: '1.2-2' }}</p>  <!-- 1,234.56 -->

<!-- Currency formatting -->
<p>{{ 1234.56 | currency }}</p>  <!-- $1,234.56 -->
<p>{{ 1234.56 | currency:'EUR' }}</p>  <!-- 1,234.56 € -->

<!-- Percentage formatting -->
<p>{{ 0.856 | percent: '1.0-2' }}</p>  <!-- 85.6% -->`;

  dateFormats = [
    {
      locale: 'en-US',
      short: '1/15/2024',
      medium: 'Jan 15, 2024',
      long: 'January 15, 2024',
      full: 'Monday, January 15, 2024',
      pattern: 'M/d/yyyy'
    },
    {
      locale: 'de-DE',
      short: '15.1.2024',
      medium: '15. Jan. 2024',
      long: '15. Januar 2024',
      full: 'Montag, 15. Januar 2024',
      pattern: 'd.M.yyyy'
    },
    {
      locale: 'fr-FR',
      short: '15/01/2024',
      medium: '15 janv. 2024',
      long: '15 janvier 2024',
      full: 'lundi 15 janvier 2024',
      pattern: 'dd/MM/yyyy'
    },
    {
      locale: 'ja-JP',
      short: '2024/1/15',
      medium: '2024年1月15日',
      long: '2024年1月15日',
      full: '2024年1月15日月曜日',
      pattern: 'yyyy/M/d'
    },
    {
      locale: 'ar-SA',
      short: '15/1/2024',
      medium: '15 يناير 2024',
      long: '15 يناير 2024',
      full: 'الإثنين 15 يناير 2024',
      pattern: 'd/M/yyyy'
    }
  ];

  numberFormats = [
    {
      locale: 'en-US',
      standard: '1,234.56',
      currency: '$1,234.56',
      percent: '123,456%',
      decimalSeparator: '.',
      thousandsSeparator: ','
    },
    {
      locale: 'de-DE',
      standard: '1.234,56',
      currency: '1.234,56 €',
      percent: '123.456 %',
      decimalSeparator: ',',
      thousandsSeparator: '.'
    },
    {
      locale: 'fr-FR',
      standard: '1 234,56',
      currency: '1 234,56 €',
      percent: '123 456 %',
      decimalSeparator: ',',
      thousandsSeparator: ' '
    },
    {
      locale: 'ja-JP',
      standard: '1,234.56',
      currency: '¥1,235',
      percent: '123,456%',
      decimalSeparator: '.',
      thousandsSeparator: ','
    },
    {
      locale: 'ar-SA',
      standard: '١٬٢٣٤٫٥٦',
      currency: '١٬٢٣٤٫٥٦ ر.س.',
      percent: '١٢٣٬٤٥٦٪',
      decimalSeparator: '٫',
      thousandsSeparator: '٬'
    }
  ];

  currencyFormats = [
    { locale: 'en-US', currency: 'USD', format: 'prefix', example: '$1,234.56', symbol: '$' },
    { locale: 'de-DE', currency: 'EUR', format: 'suffix', example: '1.234,56 €', symbol: '€' },
    { locale: 'gb-GB', currency: 'GBP', format: 'prefix', example: '£1,234.56', symbol: '£' },
    { locale: 'ja-JP', currency: 'JPY', format: 'prefix', example: '¥1,235', symbol: '¥' },
    { locale: 'in-IN', currency: 'INR', format: 'prefix', example: '₹1,234.56', symbol: '₹' },
    { locale: 'br-BR', currency: 'BRL', format: 'prefix', example: 'R$ 1.234,56', symbol: 'R$' }
  ];

  angularPipes = [
    {
      pipe: 'DatePipe',
      usage: '{{ date | date: \'short\' }}',
      description: 'Formats dates according to locale',
      formats: ['short', 'medium', 'long', 'full', 'custom pattern']
    },
    {
      pipe: 'TimePipe',
      usage: '{{ date | date: \'shortTime\' }}',
      description: 'Formats time according to locale',
      formats: ['shortTime', 'mediumTime', 'longTime', 'custom pattern']
    },
    {
      pipe: 'DecimalPipe',
      usage: '{{ value | number: \'1.2-3\' }}',
      description: 'Formats numbers with locale-specific separators',
      formats: ['digits info: minIntegerDigits.minFractionDigits-maxFractionDigits']
    },
    {
      pipe: 'CurrencyPipe',
      usage: '{{ value | currency }}',
      description: 'Formats currency with locale symbol and separators',
      formats: ['currency code', 'symbol', 'custom digits']
    },
    {
      pipe: 'PercentPipe',
      usage: '{{ value | percent: \'1.2-2\' }}',
      description: 'Formats percentages with locale separators',
      formats: ['digits info']
    }
  ];

  relativeDateFormats = [
    { value: 'today', example: 'Today', format: 'relative' },
    { value: 'yesterday', example: 'Yesterday', format: 'relative' },
    { value: 'tomorrow', example: 'Tomorrow', format: 'relative' },
    { value: 'last week', example: '5 days ago', format: 'relative' },
    { value: 'next month', example: 'in 25 days', format: 'relative' },
    { value: 'this year', example: 'Jan 15', format: 'relative' }
  ];

  timezoneConsiderations = [
    'User\'s local timezone vs server timezone',
    'Daylight Saving Time (DST) transitions',
    'UTC offset for different regions',
    'Timezone-aware date-time libraries (date-fns, Day.js)',
    'Display timezone abbreviations (EST, PST, etc.)',
    'Store times in UTC, display in user\'s timezone',
    'Consider timezone when scheduling recurring events',
    'Handle ambiguous times during DST transitions'
  ];
}
