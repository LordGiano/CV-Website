// timeline.component.ts
import { Component, OnInit } from '@angular/core';

interface TimelineItem {
  id: number;
  type: 'education' | 'work';
  title: string;
  institution: string;
  startDate: Date;
  endDate: Date | null; // null means 'Present'
  description: string;
}

interface YearMarker {
  year: number;
  position: number;
}

interface MonthMarker {
  position: number;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: 'education',
      title: 'BSc Informatika',
      institution: 'Eötvös Loránd Tudományegyetem (ELTE)',
      startDate: new Date(2018, 8, 1), // 2018 szeptember
      endDate: new Date(2022, 5, 30), // 2022 június
      description: 'Informatikai tanulmányok fő fókusszal a szoftverfejlesztésre és webes technológiákra. Szakdolgozat: Single-page alkalmazások fejlesztési módszertanainak összehasonlítása.'
    },
    {
      id: 2,
      type: 'work',
      title: 'Junior Webfejlesztő',
      institution: 'WebSolutions Kft.',
      startDate: new Date(2019, 0, 1), // 2019 január
      endDate: new Date(2020, 5, 30), // 2020 június
      description: 'Kisebb vállalati weboldalak és webáruházak fejlesztése HTML, CSS és JavaScript használatával. Bevezetés az Angular alapjaiba.'
    },
    {
      id: 3,
      type: 'education',
      title: 'Frontend-fejlesztő szakirányú tanfolyam',
      institution: 'Codecool',
      startDate: new Date(2020, 1, 1), // 2020 február
      endDate: new Date(2020, 4, 31), // 2020 május
      description: 'Intenzív képzés modern frontend technológiákból, különös tekintettel az Angular keretrendszerre.'
    },
    {
      id: 4,
      type: 'work',
      title: 'Frontend Fejlesztő',
      institution: 'Digital Solutions Zrt.',
      startDate: new Date(2021, 2, 1), // 2021 március
      endDate: new Date(2023, 11, 31), // 2023 december
      description: 'Angular alapú vállalati alkalmazások fejlesztése, RESTful API integrációk, unit tesztek írása, komponensek újrafelhasználhatóságának biztosítása.'
    },
    {
      id: 5,
      type: 'education',
      title: 'MSc Informatika',
      institution: 'Budapesti Műszaki és Gazdaságtudományi Egyetem (BME)',
      startDate: new Date(2022, 8, 1), // 2022 szeptember
      endDate: new Date(2024, 5, 30), // 2024 június
      description: 'Specializáció: Vállalati információs rendszerek és web alkalmazás fejlesztés. Kutatási terület: Single-page webalkalmazások teljesítményoptimalizálása.'
    },
    {
      id: 6,
      type: 'work',
      title: 'Senior Frontend Fejlesztő',
      institution: 'Innovation Tech Kft.',
      startDate: new Date(2024, 0, 1), // 2024 január
      endDate: null, // Jelenleg is tart
      description: 'Komplex Angular alkalmazások architektúrájának tervezése, fejlesztői csapat vezetése, teljesítményoptimalizálás, state management megoldások implementálása.'
    }
  ];

  yearMarkers: YearMarker[] = [];
  monthMarkers: MonthMarker[] = [];

  // Konfiguráció
  pixelsPerMonth = 20; // 20px = 1 hónap
  startYear = 2018;
  endYear = 2025;

  constructor() { }

  ngOnInit(): void {
    this.generateTimelineMarkers();
    this.calculateItemPositions();
  }

  generateTimelineMarkers(): void {
    // Évek generálása
    for (let year = this.startYear; year <= this.endYear; year++) {
      const position = (year - this.startYear) * 12 * this.pixelsPerMonth;
      this.yearMarkers.push({ year, position });

      // Hónapok generálása minden évhez (kivéve az évek jelölési pontjainál)
      for (let month = 1; month <= 11; month++) {
        const monthPosition = position + month * this.pixelsPerMonth;
        this.monthMarkers.push({ position: monthPosition });
      }
    }
  }

  calculateItemPositions(): void {
    this.timelineItems.forEach(item => {
      // Kiszámoljuk a kezdő pozíciót az idő alapján
      const startMonths =
        (item.startDate.getFullYear() - this.startYear) * 12 +
        item.startDate.getMonth();

      // Dinamikusan beállítjuk a top értéket
      (item as any).topPosition = startMonths * this.pixelsPerMonth;
    });
  }

  getFormattedDateRange(startDate: Date, endDate: Date | null): string {
    const start = new Intl.DateTimeFormat('hu-HU', {
      year: 'numeric',
      month: 'long'
    }).format(startDate);

    if (!endDate) {
      return `${start} - Jelenleg`;
    }

    const end = new Intl.DateTimeFormat('hu-HU', {
      year: 'numeric',
      month: 'long'
    }).format(endDate);

    return `${start} - ${end}`;
  }

  // Segédfüggvény annak eldöntésére, hogy egy elem jobb vagy bal oldalra kerüljön
  isLeftSide(item: TimelineItem): boolean {
    return item.type === 'education';
  }
}
