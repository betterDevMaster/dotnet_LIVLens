/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation'

const navigationItems: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Data Entry',
        type: 'basic',
        icon: 'heroicons_outline:table',
        link: '/collect',
    },
    {
        id: 'example',
        title: 'Event Detail',
        type: 'basic',
        icon: 'heroicons_outline:clipboard-list',
        link: '/event',
    },
    {
        id: 'example',
        title: 'Analytics',
        type: 'basic',
        icon: 'heroicons_outline:presentation-chart-line',
        link: '/dashboards/brand',
    },
    {
        id: 'example',
        title: 'Administration',
        type: 'basic',
        icon: 'heroicons_outline:adjustments',
        link: '/admin',
    },
]

export const defaultNavigation: FuseNavigationItem[] = [...navigationItems]
export const compactNavigation: FuseNavigationItem[] = [...navigationItems]
export const futuristicNavigation: FuseNavigationItem[] = [...navigationItems]
export const horizontalNavigation: FuseNavigationItem[] = [...navigationItems]
