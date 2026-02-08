import { Flex, Space, Table, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { message, Popconfirm } from 'antd';
import DetailBookModal from './detailBook.modal';
import UpdateBookControl from './updateBook.control';
import UpdateBookUncontrol from './updateBook.uncontrol';
import { deleteBookAPI } from '../../services/api.services';
const BookTable = (props) => {
    const { dataBooks, loadBooks
        , current, pageSize, total,
        setCurrent, setPageSize
    } = props;
    
    const [dataDetail, setDataDetail] = useState({});
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    // delete
    const confirm = async (record) => {
        const res= await deleteBookAPI(record);
        if (res && res.data) {
            message.success(`Book id ${record} deleted successfully`);
            await loadBooks();
        }
        else {
            message.error(`Book id ${record} deletion failed: ${JSON.stringify(res.message)}`);
        }
    }
    const cancel = e => {
        console.log(e);
        message.error('Cancel delete');
    };
    const columns = [
        {
            title: 'Order Number',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                );
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => {
                return (
                    <a 
                        href="#"
                        onClick={() => { setIsDetailModalOpen(true); setDataDetail(record); }}
                    >
                        {record._id}
                    </a>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
            key: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index, action) => {
                if (text) 
                    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
                else 
                    return "";
            }
        },
        {
            title: 'Số lượng',
            key: 'quantity',
            dataIndex: 'quantity',

        },
        {
            title: 'Tác giả',
            key: 'author',
            dataIndex: 'author',

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <EditOutlined
                                style={{ color: "blue", cursor: "pointer" }}
                                onClick={() => {
                                    setDataUpdate(record);
                                    setIsUpdateModalOpen(true);
                                }}
                            />
                            <Popconfirm
                                title="Delete the book"
                                description="Are you sure to delete this book?"
                                onConfirm={() => confirm(record._id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
                            </Popconfirm>

                        </div>
                    </>
                );
            }
        },
    ];
    const data = [
        {
            key: '1',
            id: "1aasdasd",
            title: 'Book Title 1',
            price: 100,
            quantity: 10,
            author: 'Author 1',
        },
        {
            key: '2',
            id: "2asdasd",
            title: 'Book Title 2',
            price: 150,
            quantity: 5,
            author: 'Author 2',
        },
    ];
    const onChange = (pagination, filters, sorter, extra) => {
        // nếu thay đổi trang
        if (pagination && pagination.current) {
            if (current !== pagination.current) {
                setCurrent(+pagination.current); // tự convert sang number
            }
        }

        // nếu thay đổi tổng số phần tử trên 1 trang
        if (pagination && pagination.pageSize) {
            if (pageSize !== pagination.pageSize) {
                setPageSize(+pagination.pageSize); // tự convert sang number
            }
        }
        // console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey="_id"
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }}
                onChange={onChange}
            />
            <UpdateBookUncontrol 
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBooks={loadBooks}
            />
            {/* <UpdateBookControl 
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                loadBooks={loadBooks}
            /> */}
            <DetailBookModal 
                isDetailModalOpen={isDetailModalOpen}
                setIsDetailModalOpen={setIsDetailModalOpen}
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
            />
        </>
    );
}

export default BookTable;