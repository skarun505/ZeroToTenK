import React, { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

import { supabase } from "@/lib/supabase";

// Cached product fetcher shared between generateMetadata and ProductPage
const getProduct = cache(async (slug: string) => {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        units: {
          orderBy: { pricePaise: "asc" },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
  } catch (err) {
    console.warn("Prisma product fetch error, falling back to Supabase:", err);
    try {
      const { data } = await supabase
        .from("Product")
        .select("*, units:Unit(*), reviews:Review(*)")
        .eq("slug", slug)
        .maybeSingle();
      if (data) {
        if (data.units) {
          data.units.sort((a: any, b: any) => (a.pricePaise || 0) - (b.pricePaise || 0));
        }
        if (data.reviews) {
          data.reviews.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return data;
      }
    } catch (fallbackErr) {
      console.error("Supabase getProduct fallback error:", fallbackErr);
    }
    return null;
  }
});

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.slug);

  if (!product) {
    return { title: "eBook Not Found | ZeroToTenK" };
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [];
  }

  return {
    title: `${product.title} | ZeroToTenK Digital Playbook`,
    description: `Get instant digital access to ${product.title}. Includes PDF, ePub, Notion templates, and lifetime updates.`,
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: images[0] ? [{ url: images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [];
  }

  const minPrice =
    product.units.length > 0
      ? Math.min(...product.units.map((u: any) => u.pricePaise)) / 100
      : product.mrp / 100;

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.title,
    image: images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    model: product.modelNumber,
    itemCondition: "https://schema.org/OpenBoxCondition",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: minPrice,
      offerCount: product.units.length,
      availability: product.units.some((u: any) => u.status === "AVAILABLE")
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} />
    </div>
  );
}
