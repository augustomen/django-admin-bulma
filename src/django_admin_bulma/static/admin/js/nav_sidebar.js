'use strict';
{
    const toggleNavSidebar = document.getElementById('toggle-nav-sidebar'),
        toggleNavSidebarIcon = toggleNavSidebar.querySelector('.fas'),
        navSidebar = document.getElementById('nav-sidebar');
    if (toggleNavSidebar !== null) {
        const navLinks = navSidebar.querySelectorAll('a');
        function disableNavLinkTabbing() {
            for (const navLink of navLinks) {
                navLink.tabIndex = -1;
            }
        }
        function enableNavLinkTabbing() {
            for (const navLink of navLinks) {
                navLink.tabIndex = 0;
            }
        }
        function disableNavFilterTabbing() {
            document.getElementById('nav-filter').tabIndex = -1;
        }
        function enableNavFilterTabbing() {
            document.getElementById('nav-filter').tabIndex = 0;
        }

        const main = document.getElementById('main');
        let navSidebarIsOpen = localStorage.getItem('django.admin.navSidebarIsOpen');
        if (navSidebarIsOpen === null) {
            navSidebarIsOpen = 'true';
        }
        if (navSidebarIsOpen === 'false') {
            disableNavLinkTabbing();
            disableNavFilterTabbing();
        }
        navSidebar.parentNode.classList.toggle('is-hidden', navSidebarIsOpen !== 'true');
        toggleNavSidebarIcon.classList.toggle('fa-angles-left', navSidebarIsOpen === 'true');
        toggleNavSidebarIcon.classList.toggle('fa-angles-right', navSidebarIsOpen !== 'true');

        toggleNavSidebar.addEventListener('click', function() {
            if (navSidebarIsOpen === 'true') {
                navSidebarIsOpen = 'false';
                disableNavLinkTabbing();
                disableNavFilterTabbing();
            } else {
                navSidebarIsOpen = 'true';
                enableNavLinkTabbing();
                enableNavFilterTabbing();
            }
            localStorage.setItem('django.admin.navSidebarIsOpen', navSidebarIsOpen);
            navSidebar.parentNode.classList.toggle('is-hidden');
            toggleNavSidebarIcon.classList.toggle('fa-angles-left');
            toggleNavSidebarIcon.classList.toggle('fa-angles-right');
        });
    }

    function initSidebarQuickFilter() {
        const options = [];
        const navSidebar = document.getElementById('nav-sidebar');
        if (!navSidebar) {
            return;
        }
        navSidebar.querySelectorAll('[role=menuitem]').forEach((container) => {
            options.push({title: container.querySelector('[role=menuitemtext]').innerHTML, node: container});
        });

        function checkValue(event) {
            let filterValue = event.target.value;
            if (filterValue) {
                filterValue = filterValue.toLowerCase();
            }
            if (event.key === 'Escape') {
                filterValue = '';
                event.target.value = ''; // clear input
            }
            let matches = false;
            for (const o of options) {
                let displayValue = '', hide = false;
                if (filterValue) {
                    hide = o.title.toLowerCase().indexOf(filterValue) === -1;
                    if (!hide) {
                        matches = true;
                    }
                }
                o.node.classList.toggle('is-hidden', hide);
            }
            if (!filterValue || matches) {
                event.target.classList.remove('is-warning');
            } else {
                event.target.classList.add('is-warning');
            }
            sessionStorage.setItem('django.admin.navSidebarFilterValue', filterValue);
        }

        const nav = document.getElementById('nav-filter');
        nav.addEventListener('change', checkValue, false);
        nav.addEventListener('input', checkValue, false);
        nav.addEventListener('keyup', checkValue, false);

        const storedValue = sessionStorage.getItem('django.admin.navSidebarFilterValue');
        if (storedValue) {
            nav.value = storedValue;
            checkValue({target: nav, key: ''});
        }
    }
    window.initSidebarQuickFilter = initSidebarQuickFilter;
    initSidebarQuickFilter();
}
