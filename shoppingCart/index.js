var ShoppingCar = {
  props: ['products', 'indexs'],
  data: function () {
    return {
      sName: this.products.name,
      sList: this.products.data,
      checked: false,
      checkedList: []
    }
  },
  template: `
    <div>
      <table>
        <caption>{{sName}}</caption>
        <thead>
          <tr>
            <th>
              <input @click="chooseAll" type="checkbox" name="list" v-model="checked">
            </th>
            <th>商品名称</th>
            <th>商品价格</th>
            <th>购买数量</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) of sList" :key="index">
            <td> <input type="checkbox" name="list" v-model="checkedList" :value="item.id" @click="choose(item)"> </td>
            <td> {{ item.name }} </td>
            <td> {{ item.price }} </td>
            <td>
              <button @click="handleReduce(index)" :disabled="item.count === 1">
                -
              </button>
              {{ item.count }}
              <button  @click="handleAdd(index)">
                +
              </button>
            </td>
            <td>
              <button @click="handleRemove(index)">
                移除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>{{totalMoney}}</p>
    </div>
  `,
  methods: {
    handleReduce: function (index) {
      if(this.sList[index].count === 1) return;
      this.sList[index].count--;
      this.$emit('change')
    },
    handleAdd: function (index) {
      this.sList[index].count++;
      this.$emit('change')
    },
    handleRemove: function (index) {
      this.sList.splice(index,1);
      this.$emit('change')
    },
    chooseAll: function () {
      var _this = this;
      if (_this.checked) {
        _this.checkedList = [];
      } else {
        _this.checkedList = [];
        this.sList.forEach (function (item,index) {
          _this.checkedList.push(item.id);
        })
      }
      this.$emit('change')
    },
    choose: function (goodsData) {
      this.checkedList.push(goodsData.id);
      this.$emit('change')
    }
  },
  computed: {
    totalMoney: function () {debugger
      var total = 0;
      for (var i = 0; i < this.checkedList.length; i++) {
        for (var j = 0; j < this.sList.length ;j++) { 
          if (this.checkedList[i] === this.sList[j].id) {
            total += this.sList[j].price * this.sList[j].count;
          }
        }
      }
      // this.handleTotalMoney(total);
      return total;
    }
  },
  watch: {
  'checkedList': {
      handler: function (val, oldVal) {debugger
        if (val.length === this.sList.length) {
          this.checked = true;
        } else {
          this.checked = false;
        }
        
      },
      immediate: true
    }
  }
}
var List = [{
      id: "class1",
      name: "电子产品",
      data: [{
        id: 1,
        name: "iphone 7",
        price: 6188,
        count: 1
      }, {
        id: 2,
        name: "iPad pro",
        price: 11088,
        count: 1
      }, {
        id: 3,
        name: "MacBook Air",
        price: 9188,
        count: 2
      }, {
        id: 4,
        name: "MacBook",
        price: 6988,
        count: 1
      }]
    }, {
      id: "class2",
      name: "生活用品",
      data: [{
        id: 1,
        name: "金浩毛巾",
        price: 10,
        count: 1
      }, {
        id: 2,
        name: "牙刷",
        price: 5,
        count: 1
      }]
    }, {
      id: "class3",
      name: "水果生鲜",
      data: [{
        id: 1,
        name: "苹果",
        price: 5,
        count: 3
      }, {
        id: 2,
        name: "牛肉",
        price: 24,
        count: 1
      }, {
        id: 3,
        name: "猪肉",
        price: 13,
        count: 2
      }]
    }]
var vm = new Vue({
  el: "#app",
  data: {
    List: List,
    totalPrice: 0
  },
  methods: {
    getTotalPrices: function () {debugger
      var totalMoneyList = this.$refs.goods;
      var total = 0;
      if (totalMoneyList.length > 0) {
        for(var i = 0 ; i < totalMoneyList.length ; i++){
          total += totalMoneyList[i].totalMoney;
        }
      } 
      this.totalPrice = total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
    }
  },
  components: {
    ShoppingCar: ShoppingCar
  }
})

