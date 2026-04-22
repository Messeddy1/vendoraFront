import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { getUserInfo } from "../Auth/cors/_request";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

const categories = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "fashion", name: "Fashion", icon: "👕" },
  { id: "home", name: "Home & Garden", icon: "🏠" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "books", name: "Books", icon: "📚" },
  { id: "beauty", name: "Beauty", icon: "💄" },
];

const featuredProducts = [
  {
    id: "p-01",
    title: "Wireless Noise Cancelling Headphones",
    vendor: "TechHub",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviews: 1247,
    badge: "Best Seller",
    image: "🎧",
  },
  {
    id: "p-02",
    title: "Premium Leather Wallet",
    vendor: "FashionForward",
    price: 89,
    rating: 4.9,
    reviews: 892,
    badge: "Trending",
    image: "👛",
  },
  {
    id: "p-03",
    title: "Smart Home Security Camera",
    vendor: "SecureTech",
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    reviews: 654,
    badge: "Deal",
    image: "📹",
  },
  {
    id: "p-04",
    title: "Organic Cotton T-Shirt",
    vendor: "EcoWear",
    price: 29,
    rating: 4.6,
    reviews: 432,
    badge: null,
    image: "👕",
  },
  {
    id: "p-05",
    title: "Ceramic Coffee Mug Set",
    vendor: "HomeEssentials",
    price: 45,
    rating: 4.8,
    reviews: 321,
    badge: "New",
    image: "☕",
  },
  {
    id: "p-06",
    title: "Fitness Tracker Watch",
    vendor: "FitLife",
    price: 199,
    originalPrice: 249,
    rating: 4.5,
    reviews: 987,
    badge: "Popular",
    image: "⌚",
  },
];

const deals = [
  {
    id: "d-01",
    title: "Bluetooth Speaker",
    vendor: "AudioWorld",
    price: 79,
    originalPrice: 129,
    discount: "39%",
    image: "🔊",
  },
  {
    id: "d-02",
    title: "Yoga Mat",
    vendor: "WellnessCo",
    price: 34,
    originalPrice: 59,
    discount: "42%",
    image: "🧘",
  },
  {
    id: "d-03",
    title: "LED Desk Lamp",
    vendor: "OfficePro",
    price: 49,
    originalPrice: 89,
    discount: "45%",
    image: "💡",
  },
];

const topVendors = [
  { id: "techhub", name: "TechHub", rating: 4.9, products: 1250 },
  { id: "fashionforward", name: "FashionForward", rating: 4.8, products: 890 },
  { id: "homeessentials", name: "HomeEssentials", rating: 4.7, products: 654 },
];

const HomeLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
                {user?.name
                  ? `Welcome back, ${user.name}`
                  : "Discover Amazing Products"}
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Shop from thousands of trusted vendors. Find unique items, great
                deals, and everything you need.
              </p>
            </div>
            <div className="mx-auto max-w-md">
              <div className="flex gap-2">
                <Input
                  placeholder="Search for products, brands, or categories..."
                  className="flex-1"
                />
                <Button size="lg">Search</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-background py-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex gap-8 overflow-x-auto pb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                className="flex flex-col items-center gap-2 whitespace-nowrap rounded-lg p-4 hover:bg-muted transition-colors"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 space-y-16">
        {/* Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Featured Products
              </h2>
              <p className="text-muted-foreground">
                Handpicked items from our best vendors
              </p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-6xl mb-4">
                    {product.image}
                  </div>
                  {product.badge && (
                    <Badge variant="secondary" className="w-fit">
                      {product.badge}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    by {product.vendor}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button size="sm">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Deals Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Today's Deals
              </h2>
              <p className="text-muted-foreground">
                Limited time offers from top vendors
              </p>
            </div>
            <Button variant="outline">View All Deals</Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {deals.map((deal) => (
              <Card
                key={deal.id}
                className="group cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center text-4xl mb-4">
                    {deal.image}
                  </div>
                  <Badge variant="destructive" className="w-fit">
                    {deal.discount} OFF
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-semibold text-lg">{deal.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {deal.vendor}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">${deal.price}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${deal.originalPrice}
                    </span>
                  </div>
                  <Button size="sm">Shop Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Top Vendors */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Top Vendors</h2>
            <p className="text-muted-foreground">
              Shop from our most trusted sellers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {topVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="text-center group cursor-pointer transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <CardTitle>{vendor.name}</CardTitle>
                  <CardDescription>
                    ⭐ {vendor.rating} • {vendor.products} products
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Visit Store
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12 mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    All Products
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Deals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Sell</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Start Selling
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Seller Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Seller Handbook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground">
                    Press
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Multi-Vendor Marketplace. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <div className="mt-10">
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
