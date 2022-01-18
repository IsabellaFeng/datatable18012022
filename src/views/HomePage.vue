<template>
  <div class="data-table">
    <v-data-table
      :headers="headers"
      :items="filteredData"
      item-key="id"
      :footer-props="{
        'items-per-page-options': [10, 20, 30, 40, 50],
        showFirstLastPage: true
      }"
      @click:row="handleClick"
    >
      <template v-slot:top>
        <v-text-field
          v-model="filterAge"
          type="number"
          label="Filter by age below"
          ></v-text-field>
      </template>
    </v-data-table>
    
      <v-dialog v-model="dialog" width="500">
        <v-card>
        <v-card-title class="headline" primary-title>
          User Detail:
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-5 details">
          <div>
            <span class="detail-label">id:</span>
            <span class="detail-content"> {{selectedUser.id}}</span>
          </div>
          <div>
            <span class="detail-label">name: </span>
            <span class="detail-content"> {{selectedUser.name}}</span>
          </div>
          <div>
            <span class="detail-label">email: </span> 
            <span class="detail-content"> {{selectedUser.email}} </span>
          </div>
          <div>
            <span class="detail-label">gender: </span> 
            <span class="detail-content"> {{selectedUser.gender}}</span>
          </div>
          <div>
            <span class="detail-label">age: </span> 
            <span class="detail-content"> {{selectedUser.age}}</span>
          </div>
          <div>
            <span class="detail-label">car_make: </span> 
            <span class="detail-content"> {{selectedUser.car_make}}</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <div class="charts">
      <div> 
        <span> Chart for Male/Female gender </span>
      <VueApexCharts
        type="donut"
        height="180"
        :options="genderChartOptions"
        :series="genderChartSeries"
        class="chart1"
        
      />
      </div>
      <div> 
        <span> Chart for age groups </span>
      <VueApexCharts
        type="donut"
        height="180"
        :options="ageChartOptions"
        :series="ageChartSeries"
        class="chart1"
      />
      </div>
      <div> 
        <span> Chart for car amount per gender </span>
      <VueApexCharts
        type="donut"
        height="180"
        :options="carAmountChartOptions"
        :series="carAmountChartSeries"
        class="chart1"
      />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { DataTableHeader } from 'vuetify';
import data from '@/assets/data.json';
import VueApexCharts from 'vue-apexcharts/dist/vue-apexcharts';

@Component({
  name: 'HomePage',
  components:{
    VueApexCharts
  }
})
export default class HomePage extends Vue {
  
  private filterAge= '';
  private headers: DataTableHeader[] = [
    {
      text: 'Age',
      value: 'age'
    },
    {
      text: 'Gender',
      value: 'gender'
    },
    {
      text: 'Name',
      value: 'name'
    },
    {
      text: 'Car_make',
      value: 'car_make'
    }
  ]

  private tableData = data;
  private dialog = false;
  private selectedUser = 
  {
    id:0,
    name:'',
    email:'',
    gender:'',
    age:0,
    car_make:''
  }

  private colors = ['#5968e3','#ab80f5','#e8a561', '#ebbf7c' , '#259fd8', '#32cc68', '#ccf2d9', '#23c091', '#30657e', '#a06bad'];
  private genderChartOptions = {
    labels: ['female', 'male'],
    colors: this.colors,
    chart: {
      type: 'pie'
    },
    fill: {
      type: 'solid'
    },
     plotOptions: {
        pie: {
          donut: {
            size: '52%',
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                offsetY: 7,
                fontSize: '12px'
              },
              total: {
                show: true,
                showAlways: true,

              }
            }
          }
        }
      },
  }

    private ageChartOptions = {
    labels: ['0-10', '11-20','21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '>90'],
    colors: this.colors,
    chart: {
      type: 'pie'
    },
    fill: {
      type: 'solid'
    },
     plotOptions: {
        pie: {
          donut: {
            size: '52%',
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                offsetY: 7,
                fontSize: '12px'
              },
              total: {
                show: true,
                showAlways: true,

              }
            }
          }
        }
      },
  }

  private carAmountChartOptions = {
    labels: this.gendersAndCarAmount.map((g)=>g.gender),
    colors: this.colors,
    chart: {
      type: 'pie'
    },
    fill: {
      type: 'solid'
    },
     plotOptions: {
        pie: {
          donut: {
            size: '52%',
            labels: {
              show: true,
              name: {
                show: false
              },
              value: {
                offsetY: 7,
                fontSize: '12px'
              },
              total: {
                show: true,
                showAlways: true,

              }
            }
          }
        }
      },
  }

  get genderChartSeries(){
    const female = this.tableData.filter((d) => d.gender === 'Female').length;
    const male = this.tableData.filter((d) => d.gender === 'Male').length;
    return [female, male];
  }

  get ageChartSeries() {
    const group1= this.tableData.filter((d) => d.age > 0 && d.age <= 10).length;
    const group2= this.tableData.filter((d) => d.age > 10 && d.age <= 20).length;
    const group3= this.tableData.filter((d) => d.age > 20 && d.age <= 30).length;
    const group4= this.tableData.filter((d) => d.age > 30 && d.age <= 40).length;
    const group5= this.tableData.filter((d) => d.age > 40 && d.age <= 50).length;
    const group6= this.tableData.filter((d) => d.age > 50 && d.age <= 60).length;
    const group7= this.tableData.filter((d) => d.age > 60 && d.age <= 70).length;
    const group8= this.tableData.filter((d) => d.age > 70 && d.age <= 80).length;
    const group9= this.tableData.filter((d) => d.age > 80 && d.age <= 90).length;
    const group10= this.tableData.filter((d) => d.age > 90).length;
  return [group1, group2, group3, group4, group5, group6, group7, group8, group9, group10]
  }

  get carAmountChartSeries() {
    return this.gendersAndCarAmount.map((g)=> g.car);
  }

  get gendersAndCarAmount(){
    let label:{gender:string , car: number}[] = [];
    this.tableData.forEach((d) =>{
      if(label.length>0 && label.find((l)=>l.gender === d.gender)){
        label.forEach((l) => {
          if(l.gender === d.gender){
            l.car ++;
          }
        })
      }else{
        label.push({gender: d.gender, car: 1})
      }
    })
    return label.sort((a, b) => (a.gender > b.gender) ? 1 : -1);
  }

  get filteredData(){
    if(!this.filterAge) return this.tableData;
    return this.tableData.filter(x=>x.age<parseInt(this.filterAge));
  }
 
  private handleClick(value: any) {
    this.dialog = true;
    this.selectedUser = value
  }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.data-table{
  margin: 30px;
}

.charts{
  margin-top: 20px;
  display: grid;
  grid-template-columns: auto auto auto;
}

.details {
  display:grid;

  div {
    margin-top: 8px;
    display: grid;
    grid-template-columns: 30% 70%;

  }
}

.detail-label {
 color: grey ;
 font-size: 20px;
}

.detail-content {
  color: black;
  font-size: 24px;
}

.v-dialog__container {
  display: inline-block;
}
</style>
