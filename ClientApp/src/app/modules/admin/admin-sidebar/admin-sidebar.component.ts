import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Subject, takeUntil } from 'rxjs'
import {
    FuseNavigationItem,
    FuseNavigationService,
} from '@fuse/components/navigation'

@Component({
    selector: 'admin-sidebar',
    templateUrl: './admin-sidebar.component.html',
    styleUrls: ['./admin-sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
    menuData: FuseNavigationItem[] = []
    private _adminMenuData: FuseNavigationItem[] = []

    private navItems = [
        {
            id: 'brands',
            title: 'Brands',
            slug: 'brands',
            icon: 'heroicons_outline:lightning-bolt',
        },
        {
            id: 'clubs',
            title: 'Clubs',
            slug: 'clubs',
            icon: 'heroicons_outline:chip',
        },
        {
            id: 'events',
            title: 'Events',
            slug: 'events',
            icon: 'heroicons_outline:calendar',
        },
        {
            id: 'players',
            title: 'Players',
            slug: 'players',
            icon: 'heroicons_outline:users',
        },
    ]

    /**
     * Constructor
     */
    constructor(
        private _matDialog: MatDialog,
        private _fuseNavigationService: FuseNavigationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._generateFoldersMenuLinks()
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Generate menus for folders
     *
     * @private
     */
    private _generateFoldersMenuLinks(): void {
        // Reset the folders menu data
        this._adminMenuData = []

        // Iterate through the folders
        this.navItems.forEach((ni) => {
            // Generate menu item for the folder
            const menuItem: FuseNavigationItem = {
                id: ni.id,
                title: ni.title,
                type: 'basic',
                icon: ni.icon,
                link: '/admin/' + ni.slug,
            }

            // Push the menu item to the folders menu data
            this._adminMenuData.push(menuItem)
        })

        // Update the menu data
        this._updateMenuData()
    }

    /**
     * Update the menu data
     *
     * @private
     */
    private _updateMenuData(): void {
        this.menuData = [
            {
                title: 'ADMINISTRATION',
                type: 'group',
                children: [...this._adminMenuData],
            },
        ]
    }
}
