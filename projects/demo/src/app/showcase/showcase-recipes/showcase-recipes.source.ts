export const RECIPES_TS_SOURCE = `import { Component, computed, signal } from '@angular/core';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxSearch, NxRating, NxTableOfContents, NxTocHeading } from 'nexium-ui';

interface Ingredient { name: string; amount: number; unit: string; }
interface Recipe { id: string; title: string; category: string; servings: number; icon: string; ingredients: Ingredient[]; steps: string[]; notes: string; }

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [NxNavbar, NxIcon, NxBadge, NxButton, NxSearch, NxRating, NxTableOfContents],
  templateUrl: './recipes.html',
})
export class Recipes {
  categories = ['All', 'Breakfast', 'Dinner', 'Dessert', 'Vegan'];
  activeCategory = signal('All');
  search = signal('');

  recipes: Recipe[] = [
    { id: 'shakshuka', title: 'Weekend Shakshuka', category: 'Breakfast', servings: 4, icon: 'nx-fire', ingredients: [
      { name: 'Eggs', amount: 4, unit: '' },
      // ...more ingredients
    ], steps: ['Heat olive oil...', '...'], notes: 'No feta on hand? Goat cheese works well too.' },
    // ...more recipes
  ];

  filteredRecipes = computed(() => {
    const cat = this.activeCategory();
    const term = this.search().trim().toLowerCase();
    return this.recipes.filter((r) => (cat === 'All' || r.category === cat) && (!term || r.title.toLowerCase().includes(term)));
  });

  selectedId = signal<string | null>(null);
  selectedRecipe = computed(() => this.recipes.find((r) => r.id === this.selectedId()) ?? null);

  recipeHeadings: NxTocHeading[] = [
    { id: 'ingredients', label: 'Ingredients', level: 1 },
    { id: 'steps', label: 'Steps', level: 1 },
    { id: 'notes', label: 'Notes', level: 1 },
  ];

  servings = signal(1);
  completedSteps = signal<Set<number>>(new Set());

  scaledIngredients = computed(() => {
    const recipe = this.selectedRecipe();
    if (!recipe) return [];
    const factor = this.servings() / recipe.servings;
    return recipe.ingredients.map((ing) => ({ ...ing, amount: Math.round(ing.amount * factor * 100) / 100 }));
  });

  toggleStep(index: number): void {
    this.completedSteps.update((set) => {
      const next = new Set(set);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }
}
`;

export const RECIPES_HTML_SOURCE = `<nx-search placeholder="Search recipes..." [ngModel]="search()" (ngModelChange)="search.set($event)"></nx-search>

<div class="categories">
    @for (cat of categories; track cat) {
        <button [class.active]="activeCategory() === cat" (click)="activeCategory.set(cat)">{{ cat }}</button>
    }
</div>

<div class="grid">
    @for (recipe of filteredRecipes(); track recipe.id) {
        <button (click)="openRecipe(recipe)">
            <nx-icon [icon]="recipe.icon" variant="svg"></nx-icon>
            <div>{{ recipe.title }}</div>
            <nx-rating [value]="recipe.rating" [readonly]="true"></nx-rating>
        </button>
    }
</div>

@if (selectedRecipe()) {
    <h3 id="steps">Steps</h3>
    <ol>
        @for (step of selectedRecipe()!.steps; track $index) {
            <li [class.done]="completedSteps().has($index)" (click)="toggleStep($index)">{{ step }}</li>
        }
    </ol>

    <h3 id="notes">Notes</h3>
    <p>{{ selectedRecipe()!.notes }}</p>

    <aside>
        <nx-table-of-contents [headings]="recipeHeadings"></nx-table-of-contents>

        <div class="servings-stepper">
            <button (click)="adjustServings(-1)"><nx-icon icon="nx-minus" variant="svg"></nx-icon></button>
            <span>{{ servings() }}</span>
            <button (click)="adjustServings(1)"><nx-icon icon="nx-plus" variant="svg"></nx-icon></button>
        </div>

        <h3 id="ingredients">Ingredients</h3>
        <ul>
            @for (ingredient of scaledIngredients(); track ingredient.name) {
                <li>{{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}</li>
            }
        </ul>
    </aside>
}
`;
