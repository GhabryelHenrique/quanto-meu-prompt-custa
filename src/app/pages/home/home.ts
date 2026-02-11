import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Calculadora de Prompt Real
  realPrompt = signal<string>('');

  // Estimativas de usuários de IA no mundo (em milhões)
  readonly globalUsers = signal<number>(500); // 500 milhões de usuários ativos
  readonly promptsPerUserPerDay = 10; // Média de prompts por usuário por dia

  // Calculadora de Prompts
  promptLength = signal<number>(100);
  promptsPerDay = signal<number>(10);

  // Calculadora de Imagens
  imageQuality = signal<'low' | 'medium' | 'high'>('medium');
  imagesPerDay = signal<number>(5);

  // Calculadora de Imagem Trend (caricatura personalizada)
  trendImageEnabled = signal<boolean>(false);

  // Imagens de trend consomem MUITO mais recursos:
  // - Analisam fotos do usuário (processamento de imagem)
  // - Usam modelos maiores e mais complexos
  // - Geram múltiplas iterações antes do resultado final
  // - Consomem aproximadamente 5-10x mais que uma imagem normal

  readonly trendImageWater = 50; // 50L por imagem de trend (vs 4L normal)
  readonly trendImageEnergy = 0.5; // 0.5 kWh por imagem de trend (vs 0.04 normal)

  // Impacto global da trend de caricatura
  trendGlobalWater = computed(() => {
    return this.trendImageWater * this.globalUsers() * 1_000_000;
  });

  trendGlobalEnergy = computed(() => {
    return this.trendImageEnergy * this.globalUsers() * 1_000_000;
  });

  // Comparações para imagem de trend
  trendOlympicPools = computed(() => this.trendGlobalWater() / 2_500_000);
  trendHousesPerYear = computed(() => this.trendGlobalEnergy() / 3_500);
  trendCo2 = computed(() => this.trendGlobalEnergy() * 0.5);
  trendTrees = computed(() => this.trendCo2() / 22);
  trendFlightsNYLA = computed(() => this.trendCo2() / 900); // ~900kg CO2 por voo NY-LA

  // Valores de referência baseados em estudos:
  // - Um prompt médio consome ~0.5L de água e ~0.003 kWh
  // - Uma imagem gerada consome ~4L de água e ~0.03 kWh

  // Cálculos para o Prompt Real digitado
  realPromptLength = computed(() => this.realPrompt().length);

  realPromptWater = computed(() => {
    const length = this.realPromptLength();
    if (length === 0) return 0;
    if (length <= 50) return 0.2;
    if (length <= 200) return 0.5;
    if (length <= 500) return 1.0;
    if (length <= 1000) return 2.0;
    return 3.0;
  });

  realPromptEnergy = computed(() => {
    const length = this.realPromptLength();
    if (length === 0) return 0;
    if (length <= 50) return 0.001;
    if (length <= 200) return 0.003;
    if (length <= 500) return 0.007;
    if (length <= 1000) return 0.015;
    return 0.025;
  });

  // Impacto Global - Se todos os usuários fizessem este prompt
  globalWaterImpact = computed(() => {
    return this.realPromptWater() * this.globalUsers() * 1_000_000;
  });

  globalEnergyImpact = computed(() => {
    return this.realPromptEnergy() * this.globalUsers() * 1_000_000;
  });

  // Comparações globais impactantes
  olympicPools = computed(() => {
    return this.globalWaterImpact() / 2_500_000;
  });

  housesPerYear = computed(() => {
    return this.globalEnergyImpact() / 3_500;
  });

  co2Emissions = computed(() => {
    return this.globalEnergyImpact() * 0.5;
  });

  treesNeeded = computed(() => {
    return this.co2Emissions() / 22;
  });

  // Cálculos de Prompt (calculadora original)
  promptWaterPerQuery = computed(() => {
    const length = this.promptLength();
    if (length <= 50) return 0.2;
    if (length <= 200) return 0.5;
    if (length <= 500) return 1.0;
    return 2.0;
  });

  promptEnergyPerQuery = computed(() => {
    const length = this.promptLength();
    if (length <= 50) return 0.001;
    if (length <= 200) return 0.003;
    if (length <= 500) return 0.007;
    return 0.015;
  });

  promptDailyWater = computed(() => this.promptWaterPerQuery() * this.promptsPerDay());
  promptDailyEnergy = computed(() => this.promptEnergyPerQuery() * this.promptsPerDay());
  promptMonthlyWater = computed(() => this.promptDailyWater() * 30);
  promptMonthlyEnergy = computed(() => this.promptDailyEnergy() * 30);
  promptYearlyWater = computed(() => this.promptDailyWater() * 365);
  promptYearlyEnergy = computed(() => this.promptDailyEnergy() * 365);

  // Cálculos de Imagem
  imageWaterPerGen = computed(() => {
    const quality = this.imageQuality();
    if (quality === 'low') return 2.0;
    if (quality === 'medium') return 4.0;
    return 8.0;
  });

  imageEnergyPerGen = computed(() => {
    const quality = this.imageQuality();
    if (quality === 'low') return 0.02;
    if (quality === 'medium') return 0.04;
    return 0.08;
  });

  imageDailyWater = computed(() => this.imageWaterPerGen() * this.imagesPerDay());
  imageDailyEnergy = computed(() => this.imageEnergyPerGen() * this.imagesPerDay());
  imageMonthlyWater = computed(() => this.imageDailyWater() * 30);
  imageMonthlyEnergy = computed(() => this.imageDailyEnergy() * 30);
  imageYearlyWater = computed(() => this.imageDailyWater() * 365);
  imageYearlyEnergy = computed(() => this.imageDailyEnergy() * 365);

  // Total combinado
  totalDailyWater = computed(() => this.promptDailyWater() + this.imageDailyWater());
  totalDailyEnergy = computed(() => this.promptDailyEnergy() + this.imageDailyEnergy());
  totalMonthlyWater = computed(() => this.promptMonthlyWater() + this.imageMonthlyWater());
  totalMonthlyEnergy = computed(() => this.promptMonthlyEnergy() + this.imageMonthlyEnergy());
  totalYearlyWater = computed(() => this.promptYearlyWater() + this.imageYearlyWater());
  totalYearlyEnergy = computed(() => this.promptYearlyEnergy() + this.imageYearlyEnergy());

  // Comparações interessantes
  showersEquivalent = computed(() => (this.totalYearlyWater() / 50).toFixed(1));
  phonesCharged = computed(() => (this.totalYearlyEnergy() / 0.012).toFixed(0));
  drivingKm = computed(() => (this.totalYearlyEnergy() / 0.2).toFixed(1));

  formatNumber(value: number): string {
    if (value < 0.01) return value.toFixed(4);
    if (value < 1) return value.toFixed(3);
    if (value < 10) return value.toFixed(2);
    return value.toFixed(1);
  }

  formatLargeNumber(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + ' bilhões';
    }
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + ' milhões';
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(1) + ' mil';
    }
    return value.toFixed(1);
  }

  formatWithSeparator(value: number): string {
    return value.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
  }
}
