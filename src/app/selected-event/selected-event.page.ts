import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-selected-event',
  templateUrl: './selected-event.page.html',
  styleUrls: ['./selected-event.page.scss'],
})
export class SelectedEventPage implements OnInit {

  onBuyTicketTrigger: boolean = false;
  ticketCounter = 0;

  constructor() { }

  ngOnInit() {
   
  }

  incrementTicket() {
    this.ticketCounter = this.ticketCounter + 1
  }

  decrementTicket() {
    this.ticketCounter = this.ticketCounter - 1 < 0 ? 0 : this.ticketCounter - 1
  }

  onTicketInput(event){
    this.ticketCounter = event.target.value
  }

  onBuyTicket() {
    const buyTicketFooter = document.querySelector(".buy_Ticket_Footer")
    const buyTicketFooterToolbar = document.querySelector(".buy_Ticket_Footer ion-toolbar")

    buyTicketFooter.setAttribute("style", "background-color:transparent")
    buyTicketFooterToolbar.setAttribute("style", "height:340px")
    this.onBuyTicketTrigger = true
  }

  closeCheckOut() {
    const buyTicketFooter = document.querySelector(".buy_Ticket_Footer")
    const buyTicketFooterToolbar = document.querySelector(".buy_Ticket_Footer ion-toolbar")

    this.onBuyTicketTrigger = false
    buyTicketFooter.setAttribute("style", "background-color:initial")
    buyTicketFooterToolbar.setAttribute("style", "height:initial")
  }




}
