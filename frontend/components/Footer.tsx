import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-[1500px] px-4 py-10 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <h3 className="text-2xl font-black text-orange-500">AbMilega</h3>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Your one-stop platform to find the best wedding vendors across categories and cities.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/search">Search</Link></li>
              <li><Link href="/vendors">Vendors</Link></li>
              <li><Link href="/categories">Categories</Link></li>
              <li><Link href="/cities">Cities</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">For Vendors</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li><Link href="/list-my-business">List Your Business</Link></li>
              <li><Link href="/vendor-dashboard">Vendor Dashboard</Link></li>
              <li>Packages</li>
              <li>Pricing</li>
              <li>Resources</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>Help & Support</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">We&apos;re Here to Help</h4>
            <p className="mt-4 text-sm text-gray-500">
              Our support team is always ready to assist you.
            </p>
            <p className="mt-4 text-sm text-gray-700">support@abmilega.com</p>
            <p className="mt-2 text-sm text-gray-700">+91 123 456 7890</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-gray-100 pt-5 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 AbMilega. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms & Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}