import type { InferGetStaticPropsType } from 'next';
import { getAllProducts } from '@framework/product';
import { getConfig } from '@framework/api/config';
import { Layout } from '@components/common';
import { ProductCard } from '@components/product';
import { Grid, Hero, Marquee } from '@components/ui';

export async function getStaticProps() {
  const config = getConfig();
  const products = await getAllProducts(config);

  return {
    props: {
      products
    },
    revalidate: 4 * 60 * 60
  };
}

export default function Home({
  products
}: InferGetStaticPropsType<typeof getStaticProps>) {

  return (
    <>
      <Grid>
        { products.slice(0, 3).map(product =>
          <ProductCard
            key={ product.id }
            variant="simple"
            product={ product }
          />
        ) }
      </Grid>
      <Hero
        headline="cookies, ice cream and muffin"
        description="Danish cotton candy cookie topping soufflé biscuit tootsie roll. Caramels cheesecake chupa chups chocolate bar cotton candy cake. Dessert shortbread marshmallow jujubes ice cream topping gummies cotton candy donut. Gingerbread tart marshmallow chocolate bar cake. Marzipan jujubes sweet wafer sugar plum sesame snaps. Jelly beans chupa chups sugar plum tart sweet roll shortbread cupcake. Marshmallow biscuit cookie candy gummi bears caramels pie soufflé."
      />
      <Marquee>
        { products.slice(0, 3).map(product =>
          <ProductCard
            key={ product.id }
            variant="slim"
            product={ product }
          />
        ) }
      </Marquee>
      <Grid layout="B">
        { products.slice(0, 3).map(product =>
          <ProductCard
            key={ product.id }
            variant="simple"
            product={ product }
          />
        ) }
      </Grid>
      <Marquee variant="secondary">
        { products.slice(0, 3).map(product =>
          <ProductCard
            key={ product.id }
            variant="slim"
            product={ product }
          />
        ) }
      </Marquee>
    </>
  );
}

Home.Layout = Layout;