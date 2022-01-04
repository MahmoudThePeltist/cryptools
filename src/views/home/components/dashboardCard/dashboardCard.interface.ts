import { ReactElement } from "react";

export interface IDashboardCardProps {
    pretitle: ReactElement,
    title: ReactElement,
    subtitle: ReactElement,
    body: string,
    link?: string
}