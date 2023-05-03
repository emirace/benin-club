import Gallery from '@/components/Gallery';
import { services } from '@/constants/servicesCard';
import HeroSectionPage from '@/sections/HeroSectionPage';
import React from 'react';

export default function Kitchen() {
  const { title, description } = services[1];
  return (
    <>
      <HeroSectionPage
        image="/images/manetKitchen/image3.JPG"
        name={title}
        desc={description}
      />
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              CANDYLAND
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Specializes in making all varieties of confectionaries such as
              Shawarma, Club Sandwich, Scotched Eggs, Cakes, Meat Pie, Chicken
              Pie, Fish Pie, Sausage Roll, Egg Roll etc.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              They also make Popcorn, Ice Cream of different flavour, Cocktails,
              Chapman, Candy Floss, Bread and Small chops. They sell children
              toys and render indoor and outdoor catering services.
            </p>
            <Gallery images={['image1.JPG', 'image2.JPG']} link="/candyland" />
          </div>

          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              MANET KITCHEN
            </h2>

            <p className="mt-4 text-lg text-gray-500">
              They offer the following; Jollof rice, Fried rice, Ofada rice,
              Banga rice, Coconut rice, Spaghetti, and Oil rice (Native rice)
              with toppings like Dodo, Moi-Moi, Vegetable salad, pasta and
              salad.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              They also offer swallow like Amala, Semo, Pounded Yam, Wheat,
              Starch, and Oat-Meal with soup like Ewedu, Gbegiri, Vegetable,
              Banga, Egusi, Black soup, Ogbono and Owo soup.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              They offer INTERCONTINENTAL DISHES such as Chinese Fried Rice,
              Russian salad, Chicken Escalope, Spaghetti Bolognese, Green Salad,
              Singapore Fried Noodles, Beef Croma, Chicken Casseroie, Farfare
              Pasta in Vegetable sauce, Shredded Beef in green pepper sauce etc.
              Fried Fish Batter, Stewed Beef, Stewed Chicken/Turkey, Cat Fish,
              Dry Fish, fish in tomato sauce, chicken in tomato sauce, fish in
              curry sauce, Assorted and Goat Meat are also available..
            </p>

            <p className="mt-4 text-lg text-gray-500">
              They also offer indoor and outdoor catering services.
            </p>
            <Gallery
              images={[
                'image1.JPG',
                'image2.JPG',
                'image3.JPG',
                'image4.JPG',
                'image5.JPG',
                'image6.JPG',
                'image7.JPG',
              ]}
              link="/manetKitchen"
            />
          </div>
          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              MIMI&apos;S KITCHEN
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              They offer indoor and outdoor catering services.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              African dishes are available such as Pounded Yam, Semo, Starch,
              Amala, Garri (Eba) with soup like Banga, Okro, Black soup, Oha,
              Bitter Leaf, White soup, Egusi, Ogbono, and Vegetable Soup.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Continental Dishes includes Basmati Fried and Jollof Rice, Curry
              Sauce and Rice, VP Sauce and Rice, Salad etc.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              All kinds of meat and assorted Pepper soup are also available.
              Nkwobi is available also with different varieties of meat.{' '}
            </p>
            <p className="mt-4 text-lg text-gray-500">
              You can contact them on 07034499317.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-3xl md:text-5xl uppercase font-bold text-red">
              PERFECT KITCHEN
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              They offer the following services to customers such as Chinese
              meal, making different types of sauce such as Kpomo Sauce, Chicken
              sauce, Turkey sauce, Goat meat sauce etc.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              They offer hot cat fish peppersoup, Chicken Peppersoup, Turkey
              peppersoup, Bush meat peppersoup, Gizzard Peppersoup, Snail
              peppersoup etc.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              They also offer Poundo, Wheat, Semo, Plantain, Amala, Starch,
              Garri with soups such as Vegetable, Melon, Ogbono, Okro,
              Groundnut, Afang, White, Black and Banga Soup etc.
            </p>

            <p className="mt-4 text-lg text-gray-500">
              They also offer indoor and outdoor catering services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
