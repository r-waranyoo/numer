import React, { Component } from "react";
//import "/Users/Admin/Desktop/numer/my-app/src/App.css";
import { Form, Col } from "react-bootstrap";
import { Card, Breadcrumb, Table, Button } from "antd";
import { range, compile, evaluate, simplify, parse, abs } from "mathjs";
import createPlotlyComponent from "react-plotlyjs";
import Plotly, {
  positionText,
  isCenterAnchor
} from "plotly.js/dist/plotly-cartesian";
const PlotlyComponent = createPlotlyComponent(Plotly);
let dataInTable = [];
let data = [];
let fxr = [],
  fxl = [];

class BisectionMethod extends Component {
  componentDidMount() {
    fetch("/bisection")
      .then(res => res.json())
      .then(json => {
        this.setState({ items: json });
      });
  }
  constructor(){
    super();
    this.state = {
      function: " ",
      XR: " ",
      XL: " ",
      X: 0,
      items: [],
      showGrap: false,
      showTable: false
    };
    this.onChangefunction = this.onChangefunction.bind(this);
    this.onChangeVariableXr = this.onChangeVariableXr.bind(this);
    this.onChangeVariableXl = this.onChangeVariableXl.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onExample = this.onExample.bind(this)
  }
  /* setค่า */
  onChangefunction(func) {
    this.setState({ function: func.target.value });
  }
  onChangeVariableXr = event => {
    this.setState({ XR: event.target.value });
  };
  onChangeVariableXl = event => {
    this.setState({ XL: event.target.value });
  };
  onExample() {
    this.componentDidMount();
    this.setState({ 
      function: this.state.items.Function,
      XL: this.state.items.XL,
      XR: this.state.items.XR })
  };
  onSubmit() {
    if (this.state.XL < this.state.XR) {
      dataInTable = [];
      let sum = 0.0;
      let increaseFunction = false;
      let i = 0;
      let xm,
        xl = parseFloat(this.state.XL),
        xr = parseFloat(this.state.XR);
      let inputy = [];
      inputy["xl"] = [];
      inputy["xm"] = [];
      inputy["xr"] = [];
      inputy["error"] = [];

      /* ทำทิ้งเปล่า 1 ครั้ง */
      inputy["xl"][i] = xl;
      inputy["xr"][i] = xr;
      xm = (xl + xr) / 2;
      inputy["xm"][i] = xm;
      inputy["error"][i] = 1;
      fxr[i] = this.funcChange(xr);
      fxl[i] = this.funcChange(xl);
      increaseFunction = fxr[i] * this.funcChange(xm) < 0 ? true : false;
      if (increaseFunction) {
        xl = xm;
      } else {
        xr = xm;
      }
      i++;

      /* loop ทำ Iteration*/
      do {
        inputy["xl"][i] = xl;
        inputy["xr"][i] = xr;
        xm = (xl + xr) / 2;
        fxr[i] = this.funcChange(inputy["xr"][i]);
        fxl[i] = this.funcChange(inputy["xl"][i]);
        increaseFunction = fxr[i] * this.funcChange(xm) < 0 ? true : false;
        if (increaseFunction) {
          xl = xm;
        } else {
          xr = xm;
        }
        sum = this.funcError(xm, inputy["xm"][i - 1]);
        inputy["xm"][i] = xm;
        inputy["error"][i] = sum.toFixed(6);
        i++;
      } while (sum > 0.000001);
      this.setState({ showGrap: true, showTable: true });
      this.Graph(inputy["xl"], inputy["xr"]);
      this.createTable(
        inputy["xl"],
        inputy["xr"],
        inputy["xm"],
        inputy["error"]
      );
    }else {
      alert("Input Error");
    };
  };

  funcChange = X => {
    let scope = { x: X };
    var expr = compile(this.state.function);
    return expr.evaluate(scope);
  };
  /*function หาค่า Error*/
  funcError = (Xnew, Xold) => {
    return abs((Xnew - Xold) / Xnew);
  };
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(xl, xr, xm, error) {
    for (var i = 0; i < xl.length; i++) {
      dataInTable.push({
        iteration: i,
        xl: xl[i],
        xr: xr[i],
        xm: xm[i],
        error: error[i]
      });
    }
  }
  Graph(xl, xr) {
    data = [
      {
        type: "scatter",
        x: xl,
        y: fxl,
        marker: {
          color: "#B60400"
        },
        name: "XL"
      },
      {
        type: "scatter",
        x: xr,
        y: fxr,
        marker: {
          color: "#66FF66"
        },
        name: "XR"
      }
    ];
  } 

render() {
  var fx = this.state.function;
  let layout = {
    title: "Bisection",
    xaxis: {
    title: "X"
    }
  };
  let config = {
    showLink: false,
    displayModeBar: true
  };
  return (
    <div>
        <div width={10000} className="has-text-centered">
          <h1 className="App">Bisection Method</h1>
          <Form>
            <h2 className="text-white">Function</h2>
            <label>
              <input
                placeholder={this.state.function}
                type="text"
                value={this.state.value}
                onChange={this.onChangefunction}
              />
            </label>
            <h2 className="text-white">Xl</h2>
            <label>
              <input
                placeholder={this.state.XL}
                type="text"
                value={this.state.value}
                onChange={this.onChangeVariableXl}
              />
            </label>
            <h2 className="text-white">XR</h2>
            <label>
              <input
                placeholder={this.state.XR}
                type="text"
                value={this.state.value}
                onChange={this.onChangeVariableXr}
              />
            </label>
            <br></br>
            <br></br>

            <div>
              <Button variant="dashed" onClick={this.onSubmit} style={{ backgroundColor: '#3366CC' }}>
                <h2>Submit</h2>
              </Button>
              <Button variant="dashed" href="/bisection" style={{ backgroundColor: '#FF0033' }}>
              <h2> Clear</h2>
              </Button>
              <Button  onClick={this.onExample}style={{ backgroundColor: '#696969' }} >
              <h2> Example </h2>
              </Button>
            </div>
          </Form>
          {/* แสดง ตารางค่าที่หามาได้*/}
          {this.state.showTable === true ? (
            <Card bordered={true} style={tablestyle} id="outputCard">
              <h1 className="title">Output</h1>
              <Table
                columns={columns}
                dataSource={dataInTable}
                bodyStyle={body}
              ></Table>
            </Card>
          ) : (
            ""
          )}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {/* Plot Graph*/}
          {this.state.showGrap === true ? (
            <PlotlyComponent data={data} config={config} />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default BisectionMethod;

var tablestyle = {
  width: "100%",
  background: "#0",
  color: "#0",
  float: "inline-start",
  marginBlockStart: "2%"
};
var body = {
  fontWeight: "bold",
  fontSize: "18px",
  color: "ิblack"
};
const columns = [
  {
    title: "Iteration",
    dataIndex: "iteration",
    key: "kiteration"
  },
  {
    title: "XL",
    dataIndex: "xl",
    key: "kxl"
  },
  {
    title: "XR",
    dataIndex: "xr",
    key: "kxr"
  },
  {
    title: "Xm",
    dataIndex: "xm",
    key: "kxm"
  },
  {
    title: "Error",
    key: "kerror",
    dataIndex: "error"
  }
];
