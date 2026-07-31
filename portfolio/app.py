import streamlit as st
import streamlit.components.v1 as components

# Cấu hình trang Streamlit để sử dụng toàn bộ chiều rộng màn hình
st.set_page_config(
    page_title="portfolio",
    page_icon="🛡️",
    layout="wide", 
    initial_sidebar_state="collapsed"
)

# Đoạn mã CSS này giúp loại bỏ khoảng trắng thừa, header, footer của Streamlit
# Để giao diện HTML của chúng ta được hiển thị full màn hình đẹp nhất
hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
            /* Loại bỏ khoảng trắng padding mặc định của Streamlit */
            .block-container {
                padding-top: 0rem !important;
                padding-bottom: 0rem !important;
                padding-left: 0rem !important;
                padding-right: 0rem !important;
                max-width: 100% !important;
            }
            /* Đảm bảo iframe chứa HTML tràn viền */
            iframe {
                border: none;
                width: 100vw;
            }
            </style>
            """
st.markdown(hide_streamlit_style, unsafe_allow_html=True)

try:
    # Mở và đọc file HTML cùng thư mục
    with open("index.html", "r", encoding="utf-8") as f:
        html_data = f.read()
        
    # Render HTML thông qua components của Streamlit
    # Đặt height lớn (ví dụ 1500px hoặc lớn hơn) và scrolling=True để lướt được nội dung
    components.html(html_data, height=2000, scrolling=True)
    
except FileNotFoundError:
    st.error("Lỗi: Không tìm thấy file index.html. Vui lòng kiểm tra lại thư mục!")