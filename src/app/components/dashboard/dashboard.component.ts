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
  dataFetched:boolean;
  lg:boolean;

  // chart configuration options
  redirectsChartType:string='line';
  redirectsChartDataset = [];
  redirectsChartLabels = [];
  chartOptions = {responsive:true, legend:{labels:{fontFamily:'Quicksand', fontSize:15}},
  scales:{ yAxes:[{gridLines:{display:false},ticks: { padding: 10,fontColor: "rgba(0,0,0,1)", precision:0, suggestedMax:10, beginAtZero: true, fontFamily:'Quicksand'}}],
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
    screen.width < 1025 ? this.lg = true : this.lg = false;
  }

  fetch(): void {
    this.stats.get().subscribe((res:any) => {
        this.totals = res.data['totals'];
        this.redirectsChartLabels = Object.keys(res.data['redirect_stats']);
        const redirectDataset = {data:Object.values(res.data['redirect_stats']), label:'redirects in the last week'};
        this.redirectsChartDataset.push(redirectDataset);

        const url_stats = res.data['url_stats'];
        const urlLabels = Object.keys(url_stats);
        const length = 5 - urlLabels.length;
        for(let i=0; i < length; i++) {
            urlLabels.push('');
        }
        this.urlChartLabels = urlLabels;
        const urlDataset = {data:Object.values(url_stats), label:'most visited short links'};
        this.urlChartDataset.push(urlDataset);
        
        this.dataFetched = true;
    })
  }

}
