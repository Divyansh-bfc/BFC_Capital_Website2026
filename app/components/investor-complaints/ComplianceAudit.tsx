"use client";

import React, { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const ComplianceAudit = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);

    const monthYear = `${lastMonth.toLocaleString("default", { month: "long" })}, ${lastMonth.getFullYear()}`;

    // Generate up to 6 months of data ending at lastMonth, but no earlier than Jan 2026.
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"];
    const monthlyTrendData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - i);
        if (d.getFullYear() < 2026) continue;
        monthlyTrendData.push({
            monthStr: `${monthNames[d.getMonth()]}, ${d.getFullYear()}`,
        });
    }

    const [activeCertificate, setActiveCertificate] = useState<{
        title: string;
        pdfUrl: string;
    } | null>(null);

    useEffect(() => {
        if (activeCertificate) {
            document.body.style.overflow = "hidden";
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") setActiveCertificate(null);
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                document.body.style.overflow = "unset";
                window.removeEventListener("keydown", handleKeyDown);
            };
        } else {
            document.body.style.overflow = "unset";
        }
    }, [activeCertificate]);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">

            <div className="mb-12 pt-4">
                <h2 className="font-bold text-[#44475B] mb-6 text-[20px] md:text-3xl lg:text-4xl">
                    Compliance Audit Status
                </h2>
                <p className='mb-4 text-[#44475B] font-semibold'>“Disclosure with respect to compliance with Annual compliance audit requirement under Regulation 19(3) of <span aria-label="Sebi">SEBI</span> (Investment Advisers) Regulations, 2013 for last financial years are as under:</p>
                <div
                    className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]"
                    tabIndex={0}
                    role="region"
                    aria-label="Compliance audit status table container"
                >
                    <table className="w-full min-w-[600px] text-center border-collapse table-fixed" aria-label="Compliance Audit Status details by Financial Year">
                        <thead>
                            <tr
                                className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                                style={{
                                    background:
                                        "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                                }}
                            >
                                <th className="w-[12%] py-[10px] px-4 text-[13px] font-extrabold tracking-tight text-left" aria-label="Serial Number">
                                    Sr.No.
                                </th>
                                <th className="w-[26%] py-[10px] px-4 text-[13px] font-extrabold tracking-tight text-left">
                                    Financial Year
                                </th>
                                <th className="w-[38%] py-[10px] px-4 text-[13px] font-extrabold tracking-tight text-left">
                                    Compliance Audit Status
                                </th>
                                <th className="w-[24%] py-[10px] px-4 text-[13px] font-extrabold tracking-tight text-left">
                                    Remarks, If any
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-[#212121] bg-[#FFFFFF]">
                            <tr className="">
                                <td className="py-[12px] px-4 text-sm font-bold text-left">1</td>
                                <td className="py-[12px] px-4 text-sm font-bold text-left">FY 2025-26</td>
                                <td className="py-[12px] px-4 text-sm font-bold text-left">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveCertificate({
                                                title: "Annual Audit Compliance Certificate (FY 2025-26)",
                                                pdfUrl: "/certificates/Annual audit compliance cert. scanned copy.pdf",
                                            })
                                        }
                                        className="inline-flex items-center gap-1.5 text-[#0056B3] hover:text-[#024B39] underline underline-offset-4 decoration-[#0056B3]/70 hover:decoration-[#024B39] cursor-pointer font-bold text-left transition-colors group"
                                        aria-label="Open FY 2025-26 Compliance Audit Certificate in popup"
                                    >
                                        <span>Completed</span>
                                        <ExternalLink size={14} className="shrink-0 transition-transform group-hover:scale-110" />
                                    </button>
                                </td>
                                <td className="py-[12px] px-4 text-sm font-bold text-left">N/A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Certificate Modal Popup */}
            {activeCertificate && (
                <div
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4 md:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-label={activeCertificate.title}
                    onClick={() => setActiveCertificate(null)}
                >
                    <div
                        className="relative w-full max-w-5xl h-[88vh] bg-white rounded-2xl md:rounded-[24px] shadow-2xl flex flex-col overflow-hidden border border-gray-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100 bg-[#FAFAFA]">
                            <h3 className="text-base sm:text-lg font-bold text-[#44475B] truncate pr-4">
                                {activeCertificate.title}
                            </h3>
                            <div className="flex items-center gap-2">
                                <a
                                    href={activeCertificate.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 sm:p-2 text-gray-500 hover:text-[#024B39] hover:bg-gray-100 rounded-full transition-colors"
                                    title="Open in new tab"
                                    aria-label="Open certificate in new tab"
                                >
                                    <ExternalLink size={20} />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setActiveCertificate(null)}
                                    className="p-1.5 sm:p-2 text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                    aria-label="Close certificate popup"
                                >
                                    <X size={22} />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer Frame */}
                        <div className="flex-1 w-full bg-gray-100 relative">
                            <iframe
                                src={activeCertificate.pdfUrl}
                                className="w-full h-full border-0"
                                title={activeCertificate.title}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ComplianceAudit;
