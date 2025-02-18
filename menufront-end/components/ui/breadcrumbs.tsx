import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';
import { FaFolder } from "react-icons/fa";

type BreadcrumbItemProps = {
    title: string;
    link: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItemProps[] }) {
    return (
        <Breadcrumb>
            <BreadcrumbList className='h-[84px]'>
                {items.map((item, index) => (
                    <Fragment key={item.title}>
                        {index !== items.length - 1 && (
                            <BreadcrumbItem>
                                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
                            </BreadcrumbItem>
                        )}
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator className="flex items-center gap-2">
                                {/* @ts-ignore  */}
                                <FaFolder size={24} className="text-gray-300 w-6 h-6" />  /
                            </BreadcrumbSeparator>
                        )}
                        {index === items.length - 1 && (
                            <BreadcrumbPage className="font-semibold">{item.title}</BreadcrumbPage>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
