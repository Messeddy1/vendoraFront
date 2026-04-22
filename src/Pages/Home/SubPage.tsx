import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

const SubPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10 text-foreground">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-border bg-card p-8">
          <CardHeader>
            <CardTitle>Vendor portal</CardTitle>
            <CardDescription>
              Manage your storefront, orders, and product listings in one vendor
              dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6 space-y-5 text-muted-foreground">
            <div className="rounded-3xl border border-border bg-muted/50 p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">
                Store performance
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-3xl font-semibold text-foreground">234</p>
                  <p className="text-sm text-muted-foreground">Orders today</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-foreground">
                    4.8 ★
                  </p>
                  <p className="text-sm text-muted-foreground">Seller rating</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">New customers</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                Your next actions
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Review your latest order requests.</li>
                <li>• Update inventory and pricing across categories.</li>
                <li>• Respond to buyer messages and ratings.</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card p-6">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <Button className="w-full">Create new product listing</Button>
            <Button variant="secondary" className="w-full">
              View sales report
            </Button>
            <Button variant="ghost" className="w-full">
              Open customer support
            </Button>
            <Badge variant="default">Live vendor experience</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubPage;
