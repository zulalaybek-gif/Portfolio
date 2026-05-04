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
import { RouteErrorPage } from "./components/route-error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets",
    Component: ProjectsPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/maker-week",
    Component: MakerWeekDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/no-sense",
    Component: NoSenseDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/tarots-oracles",
    Component: TarotsOraclesDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/croisiere-danse",
    Component: CroisiereDanseDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/kitty-hub",
    Component: KittyHubDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/mya",
    Component: MyaDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/snatsh",
    Component: SnatshDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/projets/:slug",
    Component: ProjectDetailPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/mentions-legales",
    Component: MentionsLegalesPage,
    ErrorBoundary: RouteErrorPage,
  },
  {
    path: "/confidentialite",
    Component: ConfidentialitePage,
    ErrorBoundary: RouteErrorPage,
  },
]);
