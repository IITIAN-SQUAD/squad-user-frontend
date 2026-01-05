"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";
import PerformanceGraphs from "../practice/PerformanceGraphs";
import PracticeFilters from "../practice/PracticeFilters";
import QuestionList from "../practice/QuestionList";
import { Accordion, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

interface FilterState {
  subjects: string[]
  chapters: string[]
  topics: string[]
  years: string[]
  difficulty: string[]
  questionType: string[]
  previousYearOnly: boolean
}

export default function PracticeTab() {

  return (
    <div>
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-[23.04px] font-bold mb-[23.04px]">Practice Section</h2>
          <p className="text-muted-foreground mb-6 hidden md:block">
            Practice questions without any timer or accuracy pressure. Focus on learning and understanding concepts.
          </p>
        </div>

        {/* Performance Analytics */}
        <PerformanceGraphs />

        {/* Practice Interface */}
        <div className="relative">

          {/* Main Content Area */}
          <div className="w-full overflow-hidden min-w-0">
            {/* Question List - Full Width */}
            <div className="w-full">
              <QuestionList />
            </div>
          </div>
          
          {/* Filters - Mobile: Bottom Sheet, Desktop: Overlay Panel */}
          
        </div>
      </div>
    </div>
  );
}
