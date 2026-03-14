import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/home-page";
import { ProjectsPage } from "./components/projects-section";
import { ProjectDetailPage } from "./components/project-detail";
import { MentionsLegalesPage, ConfidentialitePage } from "./components/legal-page";
import { MakerWeekDetailPage } from "./components/maker-week-detail";
import { NoSenseDetailPage } from "./components/no-sense-detail";
import { TarotsOraclesDetailPage } from "./components/tarots-oracles-detail";
import { CroisiereDanseDetailPage } from "./components/croisiere-danse-detail";
import { KittyHubDetailPage } from "./components/kitty-hub-detail";
import { MyaDetailPage } from "./components/mya-detail";
import { SnatshDetailPage } from "./components/snatsh-detail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/projets",
    Component: ProjectsPage,
  },
  {
    path: "/projets/maker-week",
    Component: MakerWeekDetailPage,
  },
  {
    path: "/projets/no-sense",
    Component: NoSenseDetailPage,
  },
  {
    path: "/projets/tarots-oracles",
    Component: TarotsOraclesDetailPage,
  },
  {
    path: "/projets/croisiere-danse",
    Component: CroisiereDanseDetailPage,
  },
  {
    path: "/projets/kitty-hub",
    Component: KittyHubDetailPage,
  },
  {
    path: "/projets/mya",
    Component: MyaDetailPage,
  },
  {
    path: "/projets/snatsh",
    Component: SnatshDetailPage,
  },
  {
    path: "/projets/:slug",
    Component: ProjectDetailPage,
  },
  {
    path: "/mentions-legales",
    Component: MentionsLegalesPage,
  },
  {
    path: "/confidentialite",
    Component: ConfidentialitePage,
  },
]);