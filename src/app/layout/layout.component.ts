import { Component,AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements AfterViewInit  {

  constructor(){}
  ngAfterViewInit(): void {
    $(document).ready(() => {
        const sidebarToggle = $('#sidebarToggle');
        if (sidebarToggle.length) {
            if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
                 $('body').addClass('sb-sidenav-toggled');
            }
            sidebarToggle.on('click', (event: { preventDefault: () => void; }) => {
                event.preventDefault();
                $('body').toggleClass('sb-sidenav-toggled');
                localStorage.setItem('sb|sidebar-toggle', $('body').hasClass('sb-sidenav-toggled').toString());
            });
        }
    });
}
  
}
