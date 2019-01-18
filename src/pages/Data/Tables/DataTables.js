import React, { Component } from "react";

import { Table, Button, Icon, Tag, Checkbox, Card, Select, Divider } from "antd";
import { getDataTables, getDataDetails } from "../../../requests";
import moment from "moment"
import "./DataTables.less"
import XLSX from "xlsx"

const Option = Select.Option;

export default class DataTables extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true
    };
  }
  columns = [
    {
        title: <Checkbox />,
        key: "select",
        render: () => {
            return (<Checkbox></Checkbox>)
        }
    },
    {
      title: "Record #",
      dataIndex: "record",
      key: "record"
    },
    {
      title: "Date",
      dataIndex: "createAT",
      key: "createAT",
      render: (createAT) => {
        return moment(Number.parseInt(createAT, 10)).format('DD/MM/YYYY');
      }
    },
    {
      title: "Customer",
      key: "customer",
      dataIndex: "customer"
    },
    {
      title: "Ship To",
      key: "shipTo",
      dataIndex: "shipTo"
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price"
    },
    {
      title: "Amount",
      key: "amount",
      dataIndex: "amount"
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "Status",
      render: (status) => {
        switch(status) {
            case "Pending": return (<Tag color="#87d068">{status}</Tag>);
            case "On Hold": return (<Tag color="#f50">{status}</Tag>);
            case "Closed": return (<Tag color="#2db7f5">{status}</Tag>);
            case "Fraud": return (<Tag color="#108ee9">{status}</Tag>);
            default: return;
        }
      }
    },
    {
      title: "Actions",
      key: "action",
      render: (record) => {
        return (
          <Button size="small" 
            loading={this.state.isLoading} 
            onClick={this.handleView.bind(this, record.id)}
            >
            <Icon type="search" />
            View
          </Button>
        );
      }
    }
  ];
  // 点击查看跳转到数据详情页
  handleView = (id) => {
    this.props.history.push(`/admin/data/details/${id}`)
  }
  // 导出Excel
  exportExcel = () => {
    const title = this.columns.map(item => item.title)
    title.pop()
    // console.log(title)
    const data = this.state.dataSource.reduce((result, item) => {
        const row = [item.record, item.createAT, item.customer, item.shipTo, item.price, item.amount, item.Status]
        result.push(row)
        return result
    }, [])
    data.shift(title)
    // console.log(data)
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "sheetjs.xlsx");
  }

  componentDidMount() {
    getDataTables().then(res => {
      if (res.data.code === "200") {
        this.setState({
          dataSource: res.data.data,
          isLoading: false
        });
      }
    });
  }
  render() {
    return (
        <div id="dataTables">
            {/* TODO:标题左边图标 */}
            <Card
                title="Order Listing"
                extra={
                    <div>
                        <Button type="primary">
                            <Icon type="plus" />New Order
                        </Button>
                        <Select 
                            type="green"
                            defaultValue="Tools"
                            style={{ marginLeft: "8px", minWidth: "120px", backgroundColor: "@success-color"}}
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0'}} />
                                    <div style={{ padding: '8px', cursor: 'pointer' }}>
                                    <Icon type="plus" /> Print Invoices
                                    </div>
                                </div>
                            )}
                        >
                            <Option value="excel" onClick={this.exportExcel}>Export to Excel</Option>
                            <Option value="csv">Export to CSV</Option>
                            <Option value="xml">Export to XML</Option>
                        </Select>
                    </div>
                }
            > 
            <Table
                loading={this.state.isLoading}
                // rowkey={record => record.id}
                columns={this.columns}
                dataSource={this.state.dataSource}
                bordered
                pagination={{
                    hideOnSinglePage: true,
                    showSizeChanger: true
                }}
                size="small"
            />
            </Card>
        </div>
    );
  }
}
