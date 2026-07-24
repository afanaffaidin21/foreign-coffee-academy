import React from "react";
import { AnnouncementBar } from "@/components/marketing/AnnouncementBar";
import { Header } from "@/components/shared/Header";
import { Hero } from "@/components/marketing/Hero";
import { LearningGoals } from "@/components/marketing/LearningGoals";
import { StarterPath } from "@/components/marketing/StarterPath";
import { FreeLessons } from "@/components/marketing/FreeLessons";
import { PracticeProof } from "@/components/marketing/PracticeProof";
import { FeaturedCourses } from "@/components/marketing/FeaturedCourses";
import { FounderStory } from "@/components/marketing/FounderStory";
import { MembershipTeaser } from "@/components/marketing/MembershipTeaser";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { Footer } from "@/components/shared/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header */}
      <Header />

      {/* Main Content Sections strictly in FR-01 order */}
      <main className="flex-1">
        {/* 3. Hero */}
        <Hero />

        {/* 4. Learning Goal Selector */}
        <LearningGoals />

        {/* 5. Beginner Starter Path */}
        <StarterPath />

        {/* 6. Three Free Lessons */}
        <FreeLessons />

        {/* 7. Practice Proof */}
        <PracticeProof />

        {/* 8. Three Featured Courses */}
        <FeaturedCourses />

        {/* 9. Founder Story */}
        <FounderStory />

        {/* 10. Membership Teaser */}
        <MembershipTeaser />

        {/* 11. Final Free-Learning CTA */}
        <FinalCTA />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
