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
  scales:{ yAxes:[{gridLines:{display:false},ticks: { padding: 10,fontColor: "rgba(0,0,0,0.8)", beginAtZero: true, fontFamily:'Quicksand'}}],
  xAxes: [{gridLines:{zeroLineColor:'rgba(0,0,0,0.1)', display:false}, ticks: {padding: 10,fontColor: "rgba(0,0,0,0.8)", fontFamily:'Quicksand'}}]}
  };
  chartColors = [{backgroundColor:'rgba(51, 92, 103, 0.03)', borderColor: 'rgba(51, 92, 103, 0.3)', 
  pointBackgroundColor: 'rgba(51, 92, 103, 0.8)', pointBorderColor: 'rgba(51, 92, 103, 0.8)',  borderWidth:1, pointRadius:1, pointBorderWidth:1}]

  urlChartType:string = 'bar';
  urlChartDataset = [];
  urlChartLabels = [];
  urlChartColors = [{backgroundColor:'rgba(51, 92, 103, 0.8)', borderColor: 'rgba(51, 92, 103, 0.03)', 
  pointBackgroundColor: 'rgba(51, 92, 103, 0.8)', pointBorderColor: 'rgba(51, 92, 103, 0.8)',  borderWidth:1, pointRadius:1, pointBorderWidth:1}]
 


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
