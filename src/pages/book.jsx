import BookTable from "../components/book/book.table";
import { useState, useEffect } from "react";
import { getBooksAPI } from "../services/api.services";
import BookForm from "../components/book/book.form";
import BookFormUncontrol from "../components/book/book.form.uncontrol";
const BookPage = () => {
    const [dataBooks, setDataBooks] = useState([]);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(0);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const loadBooks = async () => {
        const res = await getBooksAPI(current, pageSize);
        if(res.data){
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
            setDataBooks(res.data.result);
            
        }
    }
    useEffect( () => {
        loadBooks();
    }, [current, pageSize]);
    return (
        <>
            <div style={{ padding: "20px" }}>
                {/* <BookForm loadBooks={loadBooks} isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen} /> */}
                <BookFormUncontrol loadBooks={loadBooks} isCreateModalOpen={isCreateModalOpen} setIsCreateModalOpen={setIsCreateModalOpen}/>
                <BookTable 
                    dataBooks={dataBooks}
                    loadBooks={loadBooks}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    setCurrent={setCurrent}
                    setPageSize={setPageSize}
                />
            </div>
        </>
    )
}
export default BookPage;