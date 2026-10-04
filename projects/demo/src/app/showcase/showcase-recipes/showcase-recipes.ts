import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NxNavbar, NxIcon, NxBadge, NxButton, NxSearch, NxRating, NxTableOfContents, NxTocHeading } from 'components';
import { ShowcaseSourceView } from '../shared/showcase-source-view/showcase-source-view';
import { RECIPES_TS_SOURCE, RECIPES_HTML_SOURCE } from './showcase-recipes.source';

type NxDifficulty = 'Easy' | 'Medium' | 'Hard';

interface NxIngredient {
  name: string;
  amount: number;
  unit: string;
}

interface NxShowcaseRecipe {
  id: string;
  title: string;
  category: string;
  time: string;
  difficulty: NxDifficulty;
  rating: number;
  servings: number;
  swatch: string;
  icon: string;
  description: string;
  ingredients: NxIngredient[];
  steps: string[];
  notes: string;
}

@Component({
  selector: 'app-showcase-recipes',
  standalone: true,
  imports: [RouterLink, FormsModule, NxNavbar, NxIcon, NxBadge, NxButton, NxSearch, NxRating, NxTableOfContents, ShowcaseSourceView],
  templateUrl: './showcase-recipes.html',
  styleUrl: './showcase-recipes.scss',
})
export class ShowcaseRecipes {
  tsSource = RECIPES_TS_SOURCE;
  htmlSource = RECIPES_HTML_SOURCE;

  categories = ['All', 'Breakfast', 'Dinner', 'Dessert', 'Vegan'];
  activeCategory = signal('All');
  search = signal('');

  recipes: NxShowcaseRecipe[] = [
    {
      id: 'shakshuka',
      title: 'Weekend Shakshuka',
      category: 'Breakfast',
      time: '30 min',
      difficulty: 'Easy',
      rating: 4.5,
      servings: 4,
      swatch: '#c0392b',
      icon: 'nx-fire',
      description: 'Eggs poached in a spiced tomato and pepper sauce, finished with feta and fresh herbs.',
      ingredients: [
        { name: 'Olive oil', amount: 2, unit: 'tbsp' },
        { name: 'Onion, diced', amount: 1, unit: '' },
        { name: 'Red bell pepper, diced', amount: 1, unit: '' },
        { name: 'Crushed tomatoes', amount: 2, unit: 'cups' },
        { name: 'Eggs', amount: 4, unit: '' },
        { name: 'Feta, crumbled', amount: 0.5, unit: 'cup' },
      ],
      steps: [
        'Heat olive oil in a wide pan over medium heat. Add onion and pepper, cook until soft, about 6 minutes.',
        'Stir in crushed tomatoes and spices, simmer for 10 minutes until slightly thickened.',
        'Make small wells in the sauce and crack an egg into each. Cover and cook until whites are set, 6-8 minutes.',
        'Top with crumbled feta and fresh herbs. Serve with crusty bread.',
      ],
      notes: 'No feta on hand? Goat cheese or ricotta salata both work well. The sauce can be made up to two days ahead and refrigerated - just reheat gently before adding the eggs.',
    },
    {
      id: 'lemon-pasta',
      title: 'Lemon Garlic Pasta',
      category: 'Dinner',
      time: '20 min',
      difficulty: 'Easy',
      rating: 4,
      servings: 2,
      swatch: '#f1c40f',
      icon: 'nx-sun',
      description: 'A bright, fast weeknight pasta with garlic, lemon, and parmesan.',
      ingredients: [
        { name: 'Spaghetti', amount: 200, unit: 'g' },
        { name: 'Garlic cloves, minced', amount: 3, unit: '' },
        { name: 'Butter', amount: 2, unit: 'tbsp' },
        { name: 'Lemon, zest + juice', amount: 1, unit: '' },
        { name: 'Parmesan, grated', amount: 0.5, unit: 'cup' },
      ],
      steps: [
        'Cook spaghetti in salted water until al dente, reserving a cup of pasta water.',
        'Melt butter in a pan, add garlic and cook until fragrant, about 1 minute.',
        'Toss in the pasta, lemon zest and juice, and a splash of pasta water. Stir until glossy.',
        'Remove from heat, stir in parmesan, and season to taste.',
      ],
      notes: 'Save more pasta water than you think you need - it is the key to a glossy, emulsified sauce. A pinch of red pepper flakes is a nice optional kick.',
    },
    {
      id: 'chocolate-tart',
      title: 'Dark Chocolate Tart',
      category: 'Dessert',
      time: '1 hr 15 min',
      difficulty: 'Medium',
      rating: 5,
      servings: 8,
      swatch: '#4e342e',
      icon: 'nx-heart',
      description: 'A silky dark chocolate ganache tart with a buttery shortbread crust.',
      ingredients: [
        { name: 'Shortbread cookies, crushed', amount: 2, unit: 'cups' },
        { name: 'Butter, melted', amount: 6, unit: 'tbsp' },
        { name: 'Dark chocolate, chopped', amount: 300, unit: 'g' },
        { name: 'Heavy cream', amount: 1, unit: 'cup' },
        { name: 'Sea salt', amount: 1, unit: 'pinch' },
      ],
      steps: [
        'Mix crushed cookies with melted butter and press into a tart pan. Chill for 20 minutes.',
        'Heat cream until just simmering, then pour over chopped chocolate. Let sit 2 minutes, then whisk smooth.',
        'Pour ganache into the chilled crust and refrigerate until set, about 45 minutes.',
        'Finish with a pinch of sea salt before serving.',
      ],
      notes: 'This tart can be made a full day ahead - it actually slices more cleanly once fully chilled overnight. Let it sit at room temperature for 10 minutes before serving.',
    },
    {
      id: 'buddha-bowl',
      title: 'Roasted Veggie Buddha Bowl',
      category: 'Vegan',
      time: '35 min',
      difficulty: 'Easy',
      rating: 4.5,
      servings: 2,
      swatch: '#27ae60',
      icon: 'nx-globe',
      description: 'Roasted sweet potato and chickpeas over greens with a tahini dressing.',
      ingredients: [
        { name: 'Sweet potato, cubed', amount: 1, unit: '' },
        { name: 'Chickpeas, drained', amount: 1, unit: 'can' },
        { name: 'Mixed greens', amount: 4, unit: 'cups' },
        { name: 'Tahini', amount: 2, unit: 'tbsp' },
        { name: 'Lemon juice', amount: 1, unit: 'tbsp' },
      ],
      steps: [
        'Toss sweet potato and chickpeas with olive oil and spices, roast at 425°F for 25 minutes.',
        'Whisk tahini with lemon juice and water until pourable.',
        'Arrange greens in bowls, top with roasted vegetables, and drizzle with tahini dressing.',
      ],
      notes: 'Roast the sweet potato and chickpeas on separate ends of the pan - chickpeas crisp up faster and can burn if crowded. Swap in quinoa for extra protein.',
    },
    {
      id: 'banana-pancakes',
      title: 'Fluffy Banana Pancakes',
      category: 'Breakfast',
      time: '25 min',
      difficulty: 'Easy',
      rating: 4,
      servings: 4,
      swatch: '#e67e22',
      icon: 'nx-sun',
      description: 'Soft, fluffy pancakes sweetened naturally with ripe banana.',
      ingredients: [
        { name: 'Ripe bananas, mashed', amount: 2, unit: '' },
        { name: 'Flour', amount: 1.5, unit: 'cups' },
        { name: 'Milk', amount: 1, unit: 'cup' },
        { name: 'Egg', amount: 1, unit: '' },
        { name: 'Baking powder', amount: 2, unit: 'tsp' },
      ],
      steps: [
        'Whisk mashed banana, milk, and egg together in a bowl.',
        'Fold in flour and baking powder until just combined - a few lumps are fine.',
        'Cook spoonfuls of batter on a buttered griddle until bubbles form, then flip.',
        'Serve warm with maple syrup.',
      ],
      notes: 'The riper (and spottier) the bananas, the sweeter and more flavorful the pancakes. Leftover batter keeps in the fridge overnight - just give it a quick stir before cooking.',
    },
    {
      id: 'mushroom-risotto',
      title: 'Wild Mushroom Risotto',
      category: 'Dinner',
      time: '45 min',
      difficulty: 'Hard',
      rating: 5,
      servings: 4,
      swatch: '#6d4c41',
      icon: 'nx-cloud',
      description: 'A creamy, slow-stirred risotto loaded with wild mushrooms and parmesan.',
      ingredients: [
        { name: 'Arborio rice', amount: 1.5, unit: 'cups' },
        { name: 'Mixed wild mushrooms', amount: 300, unit: 'g' },
        { name: 'Vegetable stock', amount: 5, unit: 'cups' },
        { name: 'White wine', amount: 0.5, unit: 'cup' },
        { name: 'Parmesan, grated', amount: 0.75, unit: 'cup' },
      ],
      steps: [
        'Sauté mushrooms until golden, set aside.',
        'Toast rice in the same pan, deglaze with white wine until absorbed.',
        'Add warm stock one ladle at a time, stirring constantly, until rice is creamy and al dente.',
        'Stir in mushrooms and parmesan off the heat. Season and serve immediately.',
      ],
      notes: 'Keep the stock at a gentle simmer in a separate pot so it stays warm as you add it - cold stock will slow the rice down and make the texture uneven.',
    },
  ];

  filteredRecipes = computed(() => {
    const cat = this.activeCategory();
    const term = this.search().trim().toLowerCase();
    return this.recipes.filter((r) => {
      const matchesCategory = cat === 'All' || r.category === cat;
      const matchesSearch = !term || r.title.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
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
    return recipe.ingredients.map((ing) => ({
      ...ing,
      amount: Math.round(ing.amount * factor * 100) / 100,
    }));
  });

  openRecipe(recipe: NxShowcaseRecipe): void {
    this.selectedId.set(recipe.id);
    this.servings.set(recipe.servings);
    this.completedSteps.set(new Set());
  }

  backToRecipes(): void {
    this.selectedId.set(null);
  }

  adjustServings(delta: number): void {
    this.servings.update((s) => Math.max(1, s + delta));
  }

  toggleStep(index: number): void {
    this.completedSteps.update((set) => {
      const next = new Set(set);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  difficultyVariant(difficulty: NxDifficulty): 'success' | 'warning' | 'danger' {
    if (difficulty === 'Easy') return 'success';
    if (difficulty === 'Medium') return 'warning';
    return 'danger';
  }
}
