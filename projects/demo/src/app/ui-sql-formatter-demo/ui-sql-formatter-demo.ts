import { Component, inject } from '@angular/core';
import { CommonService } from '../services/common.service';
import { NxSqlFormatter } from 'components';
import { DemoSection } from '../shared/demo-section/demo-section';

const MESSY_SQL =
  "select o.id, o.total, o.status, c.name, c.email, p.method from orders o join customers c on o.customer_id = c.id left join payments p on p.order_id = o.id where o.status = 'paid' and o.total > 100 order by o.total desc limit 20";

@Component({
  selector: 'app-ui-sql-formatter-demo',
  imports: [NxSqlFormatter, DemoSection],
  templateUrl: './ui-sql-formatter-demo.html',
  styleUrl: './ui-sql-formatter-demo.scss',
})
export class UiSqlFormatterDemo {
  importCode = `import { NxSqlFormatter } from 'nexium-ui';`;

  public commonService = inject(CommonService);

  sql = MESSY_SQL;

  lastFormatted = '';

  onFormatted(result: string): void {
    this.lastFormatted = result;
  }

  basicCode = `<nx-sql-formatter
    [sql]="sql"
    (formatted)="onFormatted($event)">
</nx-sql-formatter>`;

  basicTs = `sql = "select o.id, o.total, c.name from orders o join customers c on o.customer_id = c.id where o.total > 100 order by o.total desc";

onFormatted(result: string): void {
  // result is the rule-based, formatted SQL string (also shown live in the component's own panel)
}`;
}
