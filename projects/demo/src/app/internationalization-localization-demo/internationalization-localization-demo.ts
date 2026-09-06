import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-internationalization-localization-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './internationalization-localization-demo.html',
  styleUrls: ['./internationalization-localization-demo.scss'],
})
export class InternationalizationLocalizationDemo {
  commonService = inject(CommonService);

  localizationAspects = [
    {
      aspect: 'Language & Scripts',
      description: 'Proper display and input handling for different writing systems',
      considerations: ['Text direction (LTR/RTL)', 'Character rendering', 'Font support', 'Input methods']
    },
    {
      aspect: 'Date & Time Formats',
      description: 'Locale-specific date and time representations',
      considerations: ['Date patterns (MM/DD/YYYY vs DD/MM/YYYY)', 'Time format (12h/24h)', 'Timezone handling', 'Seasonal variations']
    },
    {
      aspect: 'Number & Currency Formats',
      description: 'Locale-specific number representation and currency symbols',
      considerations: ['Decimal separator', 'Thousands separator', 'Currency position', 'Precision']
    },
    {
      aspect: 'Measurement Units',
      description: 'Different measurement systems used across regions',
      considerations: ['Metric vs Imperial', 'Temperature scales', 'Weight units', 'Distance units']
    },
    {
      aspect: 'Sorting & Collation',
      description: 'Proper alphabetical ordering for different languages',
      considerations: ['Character ordering', 'Diacritical marks', 'Special characters', 'Case sensitivity']
    },
    {
      aspect: 'User Interface Elements',
      description: 'Visual and behavioral adaptations for different regions',
      considerations: ['Colors and symbolism', 'Icons and imagery', 'Button labels', 'Form layouts']
    }
  ];

  commonLocales = [
    {
      region: 'United States',
      locale: 'en-US',
      dateFormat: 'M/d/yyyy',
      timeFormat: '12-hour',
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencySymbol: '$'
    },
    {
      region: 'European (Generic)',
      locale: 'de-DE',
      dateFormat: 'd.m.yyyy',
      timeFormat: '24-hour',
      decimalSeparator: ',',
      thousandsSeparator: '.',
      currencySymbol: '€'
    },
    {
      region: 'United Kingdom',
      locale: 'en-GB',
      dateFormat: 'dd/mm/yyyy',
      timeFormat: '24-hour',
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencySymbol: '£'
    },
    {
      region: 'China',
      locale: 'zh-CN',
      dateFormat: 'yyyy年m月d日',
      timeFormat: '24-hour',
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencySymbol: '¥'
    },
    {
      region: 'Japan',
      locale: 'ja-JP',
      dateFormat: 'yyyy/m/d',
      timeFormat: '24-hour',
      decimalSeparator: '.',
      thousandsSeparator: ',',
      currencySymbol: '¥'
    },
    {
      region: 'Middle East (Arabic)',
      locale: 'ar-SA',
      dateFormat: 'd/m/yyyy',
      timeFormat: '24-hour',
      decimalSeparator: '٫',
      thousandsSeparator: '٬',
      currencySymbol: '﷼'
    }
  ];

  implementationSteps = [
    'Detect or select user locale (LOCALE_ID token)',
    'Import locale data for Angular components (registerLocaleData)',
    'Use locale pipe in templates for automatic formatting',
    'Configure NumberFormat, CurrencyPipe for locale-aware formatting',
    'Handle relative time formatting with third-party libraries',
    'Test all content with native speakers when possible',
    'Consider cultural holidays and local events',
    'Monitor analytics for locale-specific user behaviors'
  ];

  regionSettings = [
    { setting: 'First Day of Week', example: 'Sunday (US) vs Monday (Europe)' },
    { setting: 'Work Week', example: 'Monday-Friday (most) vs Friday-Thursday (some Middle East)' },
    { setting: 'Holiday Calendars', example: 'Different holidays per region' },
    { setting: 'School Year', example: 'September-June vs August-July' },
    { setting: 'Fiscal Year', example: 'January-December vs April-March' },
    { setting: 'Business Hours', example: 'Varies significantly by country' }
  ];
}
