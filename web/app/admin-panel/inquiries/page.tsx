'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircle, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

type Inquiries = {
    id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    dateSubmitted: string;
};

type Column = {
    key: keyof Inquiries;
    label: string;
    minWidth?: string;
};

const columns: Column[] = [
    { key: 'lastName', label: 'Last Name', minWidth: 'min-w-[200px]' },
    { key: 'firstName', label: 'First Name', minWidth: 'min-w-[100px]' },
    { key: 'middleName', label: 'Middle Name', minWidth: 'min-w-[150px]' },
    { key: 'email', label: 'Email', minWidth: 'min-w-[150px]' },
    { key: 'dateSubmitted', label: 'Date Submitted', minWidth: 'min-w-[150px]' },
];

const staticInquiries: Inquiries[] = [
    {
        id: 'I0001',
        lastName: 'Grant',
        firstName: 'John',
        middleName: 'Aron',
        email: 'johngrant@example.com',
        dateSubmitted: '2024-01-15',
    },
    {
        id: 'I0002',
        lastName: 'Pingris',
        firstName: 'Mark',
        middleName: '',
        email: 'markpingris@example.com',
        dateSubmitted: '2024-01-15',
    },
     {
        id: 'I0002',
        lastName: 'David',
        firstName: 'James Albert',
        middleName: '',
        email: 'david@example.com',
        dateSubmitted: '2024-01-15',
    },
    
];


export default function InquiriessPage() {
    const [data, setData] = useState<Inquiries[]>(staticInquiries);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof Inquiries | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<string>('');
    const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number; showAbove: boolean } | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            setIsOpen('');
            setDropdownPosition(null);
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleSort = (column: keyof Inquiries) => {
        if (sortColumn === column) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    let filteredWorks = data.filter((item) =>
        Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (sortColumn) {
        filteredWorks.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortDirection === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
                return sortDirection === 'asc'
                    ? Number(valueA) - Number(valueB)
                    : Number(valueB) - Number(valueA);
            }

            return sortDirection === 'asc'
                ? Number(valueA) - Number(valueB)
                : Number(valueB) - Number(valueA);
        });
    }



    const handleRowClick = (id: string) => {
        // You can implement navigation to work details here
        console.log('Clicked work:', id);
    };


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const renderCellContent = (item: Inquiries, columnKey: keyof Inquiries) => {
        {/* Render cell content based on column key */ }
        switch (columnKey) {

            case 'lastName':
                return (
                    <div className="flex items-center justify-center">
                        {item[columnKey]}
                    </div>
                );

            case 'firstName':
                return (
                    <div className=" flex items-center justify-center">
                        {item[columnKey]}
                    </div>
                );

            case 'middleName':
                return (
                    <div className=" flex items-center justify-center">
                        {item[columnKey]}
                    </div>
                );

            case 'email':
                return (
                    <div className=" flex pl-18 justify-left justify-between">
                        <a
                          href={`mailto:${item[columnKey]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#d49a35] hover:underline truncate block"
                        >
                          {item[columnKey]}
                        </a>
                        
                    </div>
                );

            case 'dateSubmitted':
                return (
                    <div className=" flex items-center justify-center">
                        {formatDate(item[columnKey] as string)}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="font-geist p-6 ml-64">
            {/* Page Header */}
            <div className="mt-4 mb-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Featured Works</h1>
                </div>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-green-100 border border-green-400 text-green-700 rounded shadow-lg text-m font-regular transition-all duration-300">
                    {successMessage}
                </div>
            )}

            <div className="bg-white border shadow-sm rounded-md">
                <div className="flex justify-end p-4 border-b border-[rgba(0,0,0,0.2)]">
                    <div className="relative w-full max-w-xs">
                        <input
                            type="text"
                            placeholder="Search"
                            className="pl-10 pr-4 py-2 border text-black border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#EAB044]"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute top-1/2 left-3 -translate-y-1/2">
                            <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className={`w-full ${filteredWorks.length > 6 ? 'max-h-[440px] overflow-y-auto' : ''}`}>
                        <table className="w-full text-sm">
                            <thead className="bg-red-50 border-b border-[rgba(0,0,0,0.2)] sticky top-0 z-10">
                                {/* Table header */}
                                <tr>
                                    {columns.map((column, index) => (
                                        <th
                                            key={index}
                                            className={`p-3 pl-5 text-left text-gray-500 font-normal cursor-pointer ${column.minWidth} truncate`}
                                            onClick={() => handleSort(column.key)}
                                        >
                                            <div className="flex justify-center gap-2">
                                                {column.label}
                                                <div className="flex items-center">
                                                  <FontAwesomeIcon icon={faChevronDown} className="w-3 h-3" />  
                                                </div>
                                                
                                            </div>
                                           
                                        </th>
                                    ))}
                                    <th className="p-3 w-[90px]"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                                            Loading data...
                                        </td>
                                    </tr>
                                ) : filteredWorks.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="p-4 text-center text-gray-500">
                                            No featured works found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredWorks.map((item, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => handleRowClick(item.id)}
                                            className={`border-b border-[rgba(0,0,0,0.2)] hover:bg-gray-100 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                                }`}
                                        >
                                            {columns.map((column) => (
                                                <td key={column.key} className={`p-3 text-sm break-words text-black `}>
                                                    {renderCellContent(item, column.key)}
                                                </td>
                                            ))}
                                            <td className="p-3 text-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                                <FontAwesomeIcon icon={faInfoCircle} className="text-[#EAB044] w-4 h-4" />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}