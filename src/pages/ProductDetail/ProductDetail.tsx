import React from 'react';

import './ProductDetail.scss';

import PageTemplate from '../../components/templates/PageTemplate';

function ProductDetailPage() {

    function renderBody() {
        return (
            <div className="bodyComponent">
                ProductDetail
            </div>
        );
    }


    return (
            <PageTemplate>{renderBody()}</PageTemplate>
    )
}

export default ProductDetailPage;
