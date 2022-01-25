import {
  ImageEdge, MoneyV2, Product as ShopifyProduct,
  ProductOption, ProductVariantConnection, SelectedOption
} from '../schema';
import { Product } from '@common/types/product';

const normalizeProductImages = ({ edges }: { edges: ImageEdge[] }) =>
  edges.map(({ node: { originalSrc: url, ...rest } }) => ({
    url: `/images/${url}`,
    ...rest
  }));

const normalizeProductPrice = ({ amount, currencyCode }: MoneyV2) => ({
  value: +amount,
  currencyCode
});

const normalizeProductOptions = ({
  id,
  values,
  name: displayName
}: ProductOption) => {
  type Output = {
    label: string,
    hexColor?: string
  };

  const normalized = {
    id,
    displayName,
    values: values.map(v => {
      let output: Output = {
        label: v
      }

      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColor: v
        };
      }

      return output;
    })
  };

  return normalized;
};

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;

    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normalizeProductOptions({ id, name, values: [value] });

        return option;
      })
    };
  });
};

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    vendor,
    description,
    images: imageConnection,
    priceRange,
    options,
    variants,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ''),
    images: normalizeProductImages(imageConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options ?
      options.filter(o => o.name !== 'Title').map(o => normalizeProductOptions(o)) : [],
    variants: variants ?
      normalizeProductVariants(variants) : [],
    ...rest
  }

  return product;
};