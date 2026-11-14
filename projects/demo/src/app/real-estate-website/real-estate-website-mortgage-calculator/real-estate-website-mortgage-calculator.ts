import { Component, computed, signal } from '@angular/core';
import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NxButton, NxIcon, NxInput, NxStatistic, NxBreadcrumb, NxBreadcrumbItem, nxProLicenseGranted } from 'components';

/**
 * Mortgage Calculator page of the "Real Estate Website" PRO template - a pure client-side
 * calculator with no backing data. Four signals drive a single computed() that runs the
 * standard amortization formula to produce the monthly payment, total loan, and total interest.
 */
@Component({
  selector: 'app-real-estate-website-mortgage-calculator',
  standalone: true,
  imports: [NgTemplateOutlet, DecimalPipe, RouterLink, NxButton, NxIcon, NxInput, NxStatistic, NxBreadcrumb],
  templateUrl: './real-estate-website-mortgage-calculator.html',
  styleUrl: './real-estate-website-mortgage-calculator.scss',
})
export class RealEstateWebsiteMortgageCalculatorDemo {
  protected readonly licensed = nxProLicenseGranted();

  protected readonly breadcrumbItems: NxBreadcrumbItem[] = [
    { label: 'Home', link: '/real-estate-website/home' },
    { label: 'Mortgage Calculator' },
  ];

  protected readonly homePrice = signal(450000);
  protected readonly downPaymentPercent = signal(20);
  protected readonly interestRatePercent = signal(6.5);
  protected readonly loanTermYears = signal(30);

  protected readonly downPaymentAmount = computed(() => this.homePrice() * (this.downPaymentPercent() / 100));

  protected readonly loanPrincipal = computed(() => Math.max(this.homePrice() - this.downPaymentAmount(), 0));

  protected readonly totalMonths = computed(() => this.loanTermYears() * 12);

  protected readonly monthlyPayment = computed(() => {
    const principal = this.loanPrincipal();
    const monthlyRate = this.interestRatePercent() / 100 / 12;
    const months = this.totalMonths();

    if (principal <= 0 || months <= 0) {
      return 0;
    }
    if (monthlyRate === 0) {
      return principal / months;
    }

    const factor = Math.pow(1 + monthlyRate, months);
    return (principal * (monthlyRate * factor)) / (factor - 1);
  });

  protected readonly totalPaid = computed(() => this.monthlyPayment() * this.totalMonths());

  protected readonly totalInterest = computed(() => Math.max(this.totalPaid() - this.loanPrincipal(), 0));

  protected onHomePriceChange(value: string): void {
    this.homePrice.set(Math.max(Number(value) || 0, 0));
  }

  protected onDownPaymentChange(value: string): void {
    this.downPaymentPercent.set(Math.min(Math.max(Number(value) || 0, 0), 100));
  }

  protected onInterestRateChange(value: string): void {
    this.interestRatePercent.set(Math.max(Number(value) || 0, 0));
  }

  protected onLoanTermChange(value: string): void {
    this.loanTermYears.set(Math.max(Number(value) || 0, 1));
  }

  protected round(value: number): number {
    return Math.round(value);
  }
}
