// src/components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 text-center text-gray-600 py-6 mt-12 border-t">
        <p>&copy; {new Date().getFullYear()} ReactPhoneStore. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
