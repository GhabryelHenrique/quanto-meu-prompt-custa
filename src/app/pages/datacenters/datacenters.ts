import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DatacenterCity {
  name: string;
  country: string;
  companies: string[];
  waterUsage: string;
  energyUsage: string;
  population: string;
  impact: string;
}

@Component({
  selector: 'app-datacenters',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './datacenters.html',
  styleUrl: './datacenters.scss'
})
export class DatacentersComponent {
  // Cidades que abrigam datacenters de IA
  readonly affectedCities: DatacenterCity[] = [
    {
      name: 'The Dalles',
      country: 'Oregon, EUA',
      companies: ['Google'],
      waterUsage: '25% da água da cidade',
      energyUsage: '1.8 TWh/ano',
      population: '15.000 habitantes',
      impact: 'Comunidade enfrenta escassez de água enquanto datacenter consome milhões de litros diariamente. Residentes relatam restrições de uso de água.'
    },
    {
      name: 'Mesa',
      country: 'Arizona, EUA',
      companies: ['Google', 'Meta'],
      waterUsage: '4.7 bilhões de litros/ano',
      energyUsage: '2.5 TWh/ano',
      population: '500.000 habitantes',
      impact: 'Em uma região desértica com seca crônica, datacenters competem com agricultura e residentes por recursos hídricos escassos.'
    },
    {
      name: 'Dublin',
      country: 'Irlanda',
      companies: ['Microsoft', 'Amazon', 'Google', 'Meta'],
      waterUsage: '12% do consumo nacional de água',
      energyUsage: '21% da energia do país',
      population: '1.4 milhões de habitantes',
      impact: 'Datacenters consomem mais energia que todos os lares irlandeses combinados. Ameaça à estabilidade da rede elétrica nacional.'
    },
    {
      name: 'Gotemburgo',
      country: 'Suécia',
      companies: ['Amazon', 'Microsoft'],
      waterUsage: '15% do consumo municipal',
      energyUsage: '500 GWh/ano',
      population: '580.000 habitantes',
      impact: 'Calor residual dos datacenters aquece milhares de casas, mas consumo de energia continua crescendo exponencialmente.'
    },
    {
      name: 'Quilicura',
      country: 'Chile',
      companies: ['Google', 'Microsoft'],
      waterUsage: '169 milhões de litros/ano (projetado)',
      energyUsage: 'Em expansão',
      population: '210.000 habitantes',
      impact: 'Em região com estresse hídrico severo, comunidades locais protestam contra instalação de novos datacenters.'
    },
    {
      name: 'Singapura',
      country: 'Singapura',
      companies: ['Google', 'Meta', 'Microsoft', 'Amazon'],
      waterUsage: '7% do consumo nacional',
      energyUsage: '7% da energia nacional',
      population: '5.6 milhões de habitantes',
      impact: 'Governo impôs moratória temporária para novos datacenters devido ao impacto ambiental. País já importa água do exterior.'
    }
  ];

  readonly selectedCity = signal<DatacenterCity | null>(null);

  // Estatísticas globais
  readonly globalStats = {
    totalWaterUsage: '626 bilhões de litros/ano',
    totalEnergy: '200 TWh/ano (2024)',
    projectedEnergy2027: '400 TWh/ano',
    carbonEmissions: '100 milhões de toneladas CO₂/ano',
    percentGlobalEnergy: '2-4%'
  };

  // Problemas sociais
  readonly socialImpacts = [
    {
      icon: '💧',
      title: 'Escassez de Água',
      description: 'Comunidades locais enfrentam racionamento enquanto datacenters consomem milhões de litros diariamente para resfriamento.',
      examples: ['The Dalles perdeu 25% de sua água', 'Chile enfrenta protestos de comunidades']
    },
    {
      icon: '⚡',
      title: 'Instabilidade Elétrica',
      description: 'Redes elétricas sobrecarregadas causam apagões e aumentam custos de energia para residentes.',
      examples: ['Irlanda: 21% da energia nacional', 'Virgínia: rede no limite']
    },
    {
      icon: '🌡️',
      title: 'Ilhas de Calor',
      description: 'Calor gerado por datacenters aumenta temperatura local, afetando qualidade de vida e consumo de energia.',
      examples: ['Aumento de 2-5°C em áreas próximas', 'Maior uso de ar-condicionado']
    },
    {
      icon: '🏠',
      title: 'Gentrificação',
      description: 'Chegada de empresas de tecnologia eleva custos de moradia, expulsando moradores de baixa renda.',
      examples: ['Aumento de 40% em aluguéis', 'Deslocamento de comunidades tradicionais']
    },
    {
      icon: '🌾',
      title: 'Impacto na Agricultura',
      description: 'Agricultores perdem acesso à água necessária para irrigação, afetando produção de alimentos.',
      examples: ['Fazendas abandonadas no Arizona', 'Conflitos por direitos de água']
    },
    {
      icon: '🏭',
      title: 'Poluição',
      description: 'Geradores de backup a diesel e sistemas de refrigeração liberam poluentes que afetam a qualidade do ar.',
      examples: ['Aumento de partículas PM2.5', 'Emissões de refrigerantes']
    }
  ];

  selectCity(city: DatacenterCity) {
    this.selectedCity.set(city);
  }

  closeDetail() {
    this.selectedCity.set(null);
  }

  formatNumber(value: number): string {
    return value.toLocaleString('pt-BR');
  }
}
