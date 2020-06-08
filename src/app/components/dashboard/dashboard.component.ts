import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private stats:StatsService) { }

  totals:any;
  redirects:any;
  dataFetched:boolean;

  // chart configuration options
  redirectsChartType:string='line';
  redirectsChartDataset = [];
  redirectsChartLabels = [];
  chartOptions = {responsive:true, legend:{labels:{fontFamily:'Quicksand', fontSize:15}},
  scales:{ yAxes:[{gridLines:{display:false},ticks: { padding: 10,fontColor: "rgba(0,0,0,1)", beginAtZero: true, fontFamily:'Quicksand'}}],
  xAxes: [{gridLines:{zeroLineColor:'rgba(0,0,0,0.1)', display:false}, ticks: {padding: 10,fontColor: "rgba(0,0,0,1)", fontFamily:'Quicksand'}}]}
  };
  chartColors = [{backgroundColor:'rgba(0,0,0,0.009)', borderColor:'rgba(51, 92, 103, 1)', 
  borderWidth:1, pointRadius:0, pointBorderWidth:1}]

  urlChartType:string = 'bar';
  urlChartDataset = [];
  urlChartLabels = [];
  urlChartColors = [{backgroundColor:'rgba(209, 221, 219, 1)', borderColor:'rgba(209, 221, 219, 1)', 
  borderWidth:1}]
 
  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.stats.get().subscribe((res:any) => {
        this.totals = res.data['totals'];
        this.redirectsChartLabels = Object.keys(res.data['redirect_stats']);
        this.urlChartLabels = Object.keys(res.data['url_stats']);

        const redirectDataset = {data:Object.values(res.data['redirect_stats']), label:'redirects in the last week'};
        this.redirectsChartDataset.push(redirectDataset);
        const urlDataset = {data:Object.values(res.data['url_stats']), label:'most visited short links'};
        this.urlChartDataset.push(urlDataset);
        
        this.redirects = res.data['redirects'];
        this.dataFetched = true;
    })
  }

}
