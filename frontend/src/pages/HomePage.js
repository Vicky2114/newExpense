import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Form, Input, Modal, Select, Table, message, DatePicker } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import Spinner from '../components/Spinner';
import moment from 'moment';
import Analytics from '../components/Analytics';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setshowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState('all');
  const [viewData, setViewData] = useState('table');
  const [edit, setEdit] = useState(null);
  //table data
  const coloumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },
    {
      title: 'Reference',
      dataIndex: 'reference'
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined onClick={() => {
            setEdit(record);
            setshowModal(true);
          }} />
          <DeleteOutlined className='mx-2' onClick={() => { handleDelete(record) }} />
        </div>
      )
    },


  ];
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transactions/delete-transaction", { transactionId: record._id });
      setLoading(false);
      message.success('Transaction Deleted');
      setAllTransaction((prevTransactions) => prevTransactions.filter((item) => item._id !== record._id));
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error('unable to delete');
    }
  }
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setLoading(true);

      let response;
      if (edit) {
        response = await axios.post('/api/v1/transactions/edit-transaction', {
          payload: {
            ...values,
            userId: user._id,
          },
          transactionId: edit._id,
        });
      } else {
        response = await axios.post('/api/v1/transactions/add-transaction', {
          ...values,
          userid: user._id,
        });
      }

      setLoading(false);
      message.success('Transaction Updated Successfully');

      // Update state with the created or updated transaction
      const updatedTransaction = response.data;
      if (edit) {
        // Replace the existing transaction in the state
        setAllTransaction((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction._id === updatedTransaction._id ? updatedTransaction : transaction
          )
        );
      } else {
        // Add the newly created transaction to the state
        setAllTransaction((prevTransactions) => [updatedTransaction, ...prevTransactions]);
      }

      // Close the modal
      setshowModal(false);
      setEdit(false);
    } catch (error) {
      setLoading(false);
      message.error('Failed to add/update transaction');
    }
  };


  useEffect(() => {
    const getAllTransaction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);

        let startDate, endDate;

        if (frequency === 'custom' && selectedDate.length === 2) {
          startDate = selectedDate[0].format('YYYY-MM-DD');
          endDate = selectedDate[1].format('YYYY-MM-DD');
        }

        const res = await axios.post('/api/v1/transactions/get-transaction', {
          userid: user._id,
          frequency,
          startDate,
          endDate,
          type,
        });

        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error('Fetch Issue with transaction');
      }
    };

    getAllTransaction();
  }, [frequency, selectedDate, type]);


  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div >
          <h6>Select frequency</h6>
          <Select className='filter-box' value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value='7'>Last 1 Week</Select.Option>
            <Select.Option value='30'>Last 1 Month</Select.Option>
            <Select.Option value='365'>Last 1 Year</Select.Option>
            <Select.Option value='custom'>custom</Select.Option>
          </Select>
          {frequency === 'custom' && (<RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />
          )}
        </div>
        <div >
          <h6>Select Type</h6>
          <Select className="filter-box" value={type} onChange={(values) => setType(values)}>
            <Select.Option value='all'>ALL</Select.Option>
            <Select.Option value='income'>INCOME</Select.Option>
            <Select.Option value='expense'>EXPENSE</Select.Option>

          </Select>

        </div>
        <div className='switch-icon'>

          <UnorderedListOutlined className={`mx-2  ${viewData === 'table' ? 'active-icon ' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
          <AreaChartOutlined className={`mx-2  ${viewData === 'analytics' ? 'active-icon ' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />

        </div>
        <PlusOutlined className=' mx-2 switch-icon' onClick={() => setshowModal(true)} />
        {/* 
          <button className='btn btn-primary' onClick={() => setshowModal(true)}><p className='bg-primary '> newTransaction</p></button> */}


      </div>
      <div className='content'>
        <div className='table-container'>
          {viewData === 'table' ? (<Table columns={coloumns} dataSource={allTransaction} />) : (<Analytics allTransaction={allTransaction} />)}
        </div>
      </div>
      <Modal title={edit ? 'Edit Transaction' : 'Add Transaction'} open={showModal} onCancel={() => setshowModal(false)} footer={false} >
        <Form layout='vertical' onFinish={handleSubmit} initialValues={edit}>

          <Form.Item label="Amount" name="amount" >
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" >
            <Input type='date' />
          </Form.Item>
          <Form.Item label="Reference" name="reference" >
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Description" name="description" >
            <Input type='text' />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button type="submit" className='custom-button'>SAVE</button>
          </div>
        </Form>
      </Modal>

    </Layout>


  )
}

export default HomePage
