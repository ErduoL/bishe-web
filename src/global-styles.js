import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @keyframes skeleton-loadding {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  html, body {
    height: 100%;
    width: 100%;
    min-height: 100%;
    position: relative;
    padding: 0;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100% !important;
    scrollbar-width: none;
    -ms-overflow-style: none; 
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .not-use-smoothing {
    -webkit-font-smoothing: initial;
    -moz-osx-font-smoothing: initial;
  }
  //自定义 antd 样式
  .ant-btn-primary[disabled] {
    color: #fff;
    background-color: #BBE1FE;
    border: 1px solid #BBE1FE;
    :active {
      color: #fff;
      background-color: #BBE1FE;
      border: 1px solid #BBE1FE;
    }
    :hover {
      color: #fff;
      background-color: #BBE1FE;
      border: 1px solid #BBE1FE;
    }
  }
  .select-account-dorp {
    .ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title {
      line-height: 34px;
    }
  }
  
  .header-icons-logout {
    color: #FF7875;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
  }
  .dorp-company-item {
    height: 40px;
    display: flex;
    align-items: center;
  }
  .blue-block {
    width: 3px;
    height: 12px;
    background: #108EE9;
    margin-right: 12px;
  }
  .red-dot {
    background-color: #F04134;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    flex-shrink: 0;
  }
  .a-tag {
    color: #1890ff;
    cursor:pointer;
  }
  .ant-table  {
    color: #18263C;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]{
    -moz-appearance: textfield;
  }
`;

export default GlobalStyle;
