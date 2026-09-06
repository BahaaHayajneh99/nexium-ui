import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonService } from '../services/common.service';
import { DemoSection } from '../shared/demo-section/demo-section';

@Component({
  selector: 'app-pattern-error-handling-demo',
  standalone: true,
  imports: [CommonModule, DemoSection],
  templateUrl: './pattern-error-handling-demo.html',
  styleUrls: ['./pattern-error-handling-demo.scss'],
})
export class PatternErrorHandlingDemo {
  commonService = inject(CommonService);

  features = [
    { name: 'Error Boundaries', description: 'Catch component errors' },
    { name: 'Error Messages', description: 'Clear error communication' },
    { name: 'Error Logging', description: 'Centralized error tracking' },
    { name: 'Retry Logic', description: 'Auto-recovery attempts' },
    { name: 'Fallback UI', description: 'Graceful degradation' },
    { name: 'Error Analytics', description: 'Error monitoring' },
  ];

  useCases = [
    { title: 'Network Errors', description: 'Handle connection failures' },
    { title: 'API Errors', description: 'Backend error responses' },
    { title: 'Validation Errors', description: 'Form submission errors' },
    { title: 'Permission Errors', description: 'Access denied errors' },
    { title: 'Not Found Errors', description: '404 pages' },
    { title: 'Server Errors', description: '500 error pages' },
  ];

  errorTypes = [
    { code: 400, type: 'Bad Request', description: 'Invalid input data' },
    { code: 401, type: 'Unauthorized', description: 'Authentication required' },
    { code: 403, type: 'Forbidden', description: 'Access denied' },
    { code: 404, type: 'Not Found', description: 'Resource not found' },
    { code: 500, type: 'Server Error', description: 'Internal server error' },
    { code: 503, type: 'Service Unavailable', description: 'Temporary outage' },
  ];

  errorHandlingStrategies = [
    'Provide clear, user-friendly error messages',
    'Show error codes for technical support',
    'Offer recovery/retry options',
    'Log errors for debugging',
    'Track error analytics',
    'Use error boundaries for UI safety',
  ];
}
