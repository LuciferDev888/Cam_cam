"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Coffee, Flame, Sprout, CupSoda, Wheat, Leaf, Sparkles, Citrus, GlassWater, IceCream, CircleDot, Beer, Sun, Bookmark } from "lucide-react";

interface MenuItem {
  name: string;
  price: string;
  isFeatured: boolean;
  desc: string;
  image: string;
  ratings: { label: string; value: number }[];
  pairing: string;
}

interface MenuCategory {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  items: MenuItem[];
}

const MENU_DATA_VI: MenuCategory[] = [
  {
    category: "Cà Phê",
    icon: Coffee,
    items: [
      {
        name: "Cà phê muối",
        price: "25,000",
        isFeatured: true,
        desc: "Cà phê Robusta đậm đặc kết hợp lớp kem muối béo ngậy đặc trưng của CAM CAM.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 2 }
        ],
        pairing: "GỢI Ý KÈM THEO: Hạt hướng dương rang mộc thơm bùi."
      },
      {
        name: "Sữa tươi cà phê sương sáo",
        price: "28,000",
        isFeatured: true,
        desc: "Sữa tươi nguyên kem thanh mát, thạch sương sáo dai giòn quyện cà phê phin thơm nồng.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm phô mai tươi để tăng độ béo ngậy."
      },
      {
        name: "Đen phin",
        price: "18,000",
        isFeatured: false,
        desc: "Cà phê phin truyền thống từ hạt Robusta rang mộc đậm vị.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 5 },
          { label: "ĐỘ NGỌT", value: 1 }
        ],
        pairing: "GỢI Ý KÈM THEO: Đĩa hạt dưa đỏ truyền thống nhâm nhi."
      },
      {
        name: "Sữa phin",
        price: "20,000",
        isFeatured: false,
        desc: "Cà phê đen phin truyền thống quyện sữa đặc Ngôi Sao Phương Nam thơm béo.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Hạt hướng dương sấy mộc."
      },
      {
        name: "Đen máy",
        price: "20,000",
        isFeatured: false,
        desc: "Cà phê pha máy Espresso nhanh gọn, thơm nhẹ hương Arabica.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 1 }
        ],
        pairing: "GỢI Ý KÈM THEO: Nhâm nhi cùng đĩa hạt dưa."
      },
      {
        name: "Sữa máy",
        price: "22,000",
        isFeatured: false,
        desc: "Cà phê pha máy Espresso quyện sữa đặc thơm ngọt nhẹ.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Ăn kèm bánh quy lạt."
      },
      {
        name: "Đen Sài Gòn",
        price: "25,000",
        isFeatured: false,
        desc: "Cà phê đen pha phin kiểu Sài Gòn loãng và nhiều đá, giải khát cực tốt.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 2 }
        ],
        pairing: "GỢI Ý KÈM THEO: Uống kèm cốc trà đá mát lạnh."
      },
      {
        name: "Sữa Sài Gòn",
        price: "25,000",
        isFeatured: false,
        desc: "Cà phê sữa nhiều đá ngọt béo đậm chất Sài Gòn phố thị.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Nhâm nhi chiều mưa lộng gió."
      },
      {
        name: "Cà phê kem trứng",
        price: "25,000",
        isFeatured: false,
        desc: "Cà phê phin nóng quyện lớp kem trứng đánh bông mịn ngọt ngào, béo ngậy.",
        image: "/images/item/ca_phe_kem_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thưởng thức khi còn ấm nóng."
      },
      {
        name: "Bạc xỉu",
        price: "25,000",
        isFeatured: false,
        desc: "Thức uống nhiều sữa ít cà phê, thơm ngậy nhẹ nhàng cho ngày mới dịu êm.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Rất hợp cho các bạn không quen uống đắng."
      },
      {
        name: "Bạc xỉu muối",
        price: "25,000",
        isFeatured: false,
        desc: "Bạc xỉu truyền thống thêm lớp kem muối mặn mặn trung hòa vị ngọt béo cực tốt.",
        image: "/images/item/ca_phe_kem_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm thạch sương sáo dai giòn."
      }
    ]
  },
  {
    category: "Món Khác",
    icon: Flame,
    items: [
      {
        name: "Cacao nóng / đá",
        price: "25,000",
        isFeatured: false,
        desc: "Bột cacao nguyên chất pha sữa đặc béo ngậy ngọt ngào.",
        image: "/images/item/cacao_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping marshmallow bông xốp."
      },
      {
        name: "Cacao muối nóng / đá",
        price: "28,000",
        isFeatured: false,
        desc: "Cacao đậm đà thêm lớp kem muối mặn béo ngậy làm bùng nổ hương vị socola nguyên bản.",
        image: "/images/item/cacao_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm phô mai tươi béo thơm."
      },
      {
        name: "Cacao latte",
        price: "28,000",
        isFeatured: false,
        desc: "Cacao nguyên chất quyện sữa tươi thanh trùng béo nhẹ và tạo bọt mịn màng.",
        image: "/images/item/cacao_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Dùng nóng vào ngày mưa se lạnh."
      },
      {
        name: "Trà gừng thảo mộc",
        price: "28,000",
        isFeatured: false,
        desc: "Cốt trà gừng cay nồng ấm áp kết hợp mật ong ngọt thanh giải độc và giữ ấm cơ thể.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Dùng kèm lát chanh vàng và sả tươi thơm mát."
      }
    ]
  },
  {
    category: "Matcha",
    icon: Sprout,
    items: [
      {
        name: "Matcha latte",
        price: "35,000",
        isFeatured: true,
        desc: "Bột trà xanh Uji Nhật Bản nguyên chất, quyện sữa tươi thanh trùng béo ngậy giữ nguyên màu xanh tươi rói tự nhiên.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm kem trứng mịn để vị béo ngậy đạt đỉnh."
      },
      {
        name: "Matcha gạo rang",
        price: "35,000",
        isFeatured: false,
        desc: "Matcha nguyên chất thơm nồng quyện hương lúa nếp rang đặc trưng của gạo lứt Nhật Bản.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping trân châu đen dẻo dai."
      },
      {
        name: "Matcha lài hạnh nhân",
        price: "35,000",
        isFeatured: false,
        desc: "Hương hoa lài thanh khiết kết hợp bột hạnh nhân béo ngậy và matcha trà xanh tinh tế.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Rắc thêm hạnh nhân lát sấy giòn."
      },
      {
        name: "*Extra Gram (+Đậm vị trà - thêm matcha)",
        price: "5,000",
        isFeatured: false,
        desc: "Thêm 1 phần matcha Uji nguyên chất cho các tri kỷ đam mê vị đắng dịu nguyên bản.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 5 },
          { label: "ĐỘ NGỌT", value: 1 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm trực tiếp vào ly Matcha Latte."
      }
    ]
  },
  {
    category: "Blao",
    icon: CupSoda,
    items: [
      {
        name: "Trà Blao cốm non yến mạch",
        price: "30,000",
        isFeatured: true,
        desc: "Trà sữa Blao Bảo Lộc thơm ngát hương hoa lài, kết hợp cốm non dẻo bùi và yến mạch hữu cơ.",
        image: "/images/item/Tra_Blao_com_non_yen_mach.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm phô mai tươi béo ngậy tan chảy."
      },
      {
        name: "Trà Blao trân châu đen",
        price: "25,000",
        isFeatured: false,
        desc: "Trà sữa Blao truyền thống thơm lài đặc trưng kết hợp trân châu đen dẻo dai mật ong.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Đĩa hạt dưa nhai vui miệng."
      },
      {
        name: "Trà Blao kem trứng / kem phô mai",
        price: "25,000",
        isFeatured: false,
        desc: "Trà sữa Blao hoa nhài phủ lớp kem trứng vàng óng ngọt ngào hoặc kem phô mai mặn béo ngậy.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Hút lớp kem muối trước rồi khuấy đều trà."
      },
      {
        name: "Trà Blao phô mai tươi / phô mai mặn / cheese ball",
        price: "28,000",
        isFeatured: false,
        desc: "Trà sữa Blao kết hợp topping phô mai tươi núng nính dẻo ngậy cực kỳ kích thích vị giác.",
        image: "/images/item/Tra_Blao_full_topping.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Rất hợp khi gọi thêm thạch dừa lửa."
      },
      {
        name: "Trà Blao full topping",
        price: "32,000",
        isFeatured: false,
        desc: "Trà sữa Blao siêu to khổng lồ kết hợp đầy đủ trân châu đen, sương sáo, cốm non và phô mai tươi.",
        image: "/images/item/Tra_Blao_full_topping.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Đủ đầy hương vị cho buổi tụ họp tri kỷ."
      }
    ]
  },
  {
    category: "Gạo Rang",
    icon: Wheat,
    items: [
      {
        name: "Trà gạo rang cốm non yến mạch",
        price: "30,000",
        isFeatured: true,
        desc: "Trà xanh gạo lứt Nhật Bản nướng thơm ngậy quyện cốm non xanh mềm dẻo và yến mạch ngậy thơm.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Rắc thêm cốm non khô dẻo bùi."
      },
      {
        name: "Trà gạo rang trân châu đen",
        price: "25,000",
        isFeatured: false,
        desc: "Trà xanh gạo rang Genmaicha đun sữa thanh mát, kết hợp trân châu đen dẻo bùi mật ong.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Đĩa hạt hướng dương giòn bùi."
      },
      {
        name: "Trà gạo rang phô mai tươi / phô mai mặn / cheese ball",
        price: "30,000",
        isFeatured: false,
        desc: "Trà gạo rang thơm lừng quyện thạch phô mai tươi béo mềm tan nhanh trong miệng.",
        image: "/images/item/Tra_gao_rang_full_topping.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Uống đá lạnh sảng khoái."
      },
      {
        name: "Trà gạo rang full topping",
        price: "35,000",
        isFeatured: false,
        desc: "Trà gạo rang sữa thơm nồng kết hợp trân châu đen, sương sáo, cốm non và thạch phô mai tươi.",
        image: "/images/item/Tra_gao_rang_full_topping.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Đủ no nê và sảng khoái cho ngày làm việc dài."
      }
    ]
  },
  {
    category: "Ô Long",
    icon: Leaf,
    items: [
      {
        name: "Trà olong cốm non yến mạch",
        price: "35,000",
        isFeatured: true,
        desc: "Cốt trà ô long Lâm Đồng đậm vị chát dịu kết hợp cốm non xanh dẻo và yến mạch hữu cơ béo bùi.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 4.5 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm trân châu trắng giòn ngọt mát."
      },
      {
        name: "Trà olong trân châu đen",
        price: "28,000",
        isFeatured: false,
        desc: "Trà ô long sữa đậm đà kết hợp trân châu đen truyền thống mật ong dai dẻo.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 4.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thưởng thức cùng đĩa hạt dưa."
      },
      {
        name: "Trà olong kem trứng / kem phô mai",
        price: "35,000",
        isFeatured: false,
        desc: "Cốt trà ô long nguyên chất đậm vị, phủ lớp màng kem trứng béo ngậy ngọt ngào hoặc phô mai mặn.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4.5 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Không dùng ống hút, uống nghiêng ly 45 độ."
      },
      {
        name: "Trà olong full topping",
        price: "40,000",
        isFeatured: false,
        desc: "Sự kết hợp bùng nổ của ô long sữa đậm đà kèm trân châu đen, thạch đào và thạch phô mai tươi cực ngậy.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4.5 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm đá bào mát lạnh."
      }
    ]
  },
  {
    category: "Hạnh Nhân",
    icon: Sparkles,
    items: [
      {
        name: "Trà lài hạnh nhân kem trứng / kem phô mai",
        price: "30,000",
        isFeatured: true,
        desc: "Hương hoa lài thanh mát quyện sữa hạnh nhân thơm bùi, phủ kem trứng béo mượt ngọt ngào.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.8 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping phô mai tươi núng nính."
      },
      {
        name: "Trà lài hạnh nhân cốm non yến mạch",
        price: "30,000",
        isFeatured: true,
        desc: "Sự kết hợp độc đáo giữa trà lài bùi hạnh nhân, cốm non dẻo ngậy và yến mạch hữu cơ bổ dưỡng.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping cốm non dẻo bùi."
      },
      {
        name: "Trà lài hạnh nhân trân châu đen",
        price: "28,000",
        isFeatured: false,
        desc: "Trà sữa lài hạnh nhân béo ngậy đặc trưng kết hợp hạt trân châu đen dẻo dai.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Nhâm nhi cùng hạt hướng dương."
      },
      {
        name: "Trà lài hạnh nhân phô mai tươi / phô mai mặn / cheese ball",
        price: "30,000",
        isFeatured: false,
        desc: "Trà nhài hạnh nhân béo ngậy kết hợp thạch phô mai tươi mềm mướt tan trong miệng.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm thạch dừa lửa dai ngọt giòn."
      },
      {
        name: "Trà lài hạnh nhân full topping",
        price: "32,000",
        isFeatured: false,
        desc: "Hạnh nhân hoa nhài ngập tràn topping trân châu đen, thạch đào và thạch phô mai tươi cực ngậy.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Rất hợp cho các tín đồ mê sữa thảo mộc hạt bùi."
      }
    ]
  },
  {
    category: "Trà Trái Cây",
    icon: Citrus,
    items: [
      {
        name: "Trà mãng cầu",
        price: "30,000",
        isFeatured: true,
        desc: "Cốt trà xanh hoa nhài ủ lạnh kết hợp thịt mãng cầu xiêm tươi ngâm đường phèn chua ngọt tự nhiên.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm thạch dừa lửa dai giòn sần sật."
      },
      {
        name: "Trà lài đặc thơm",
        price: "30,000",
        isFeatured: true,
        desc: "Trà lài nguyên chất ủ lạnh kết hợp siro đặc thơm tự ủ ngọt dịu, thanh mát thanh lọc.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Nhâm nhi cùng đĩa hạt hướng dương."
      },
      {
        name: "Trà ổi hồng dâu tây",
        price: "30,000",
        isFeatured: true,
        desc: "Hồng trà ủ lạnh kết hợp mứt ổi hồng thơm mát và dâu tây Đà Lạt ngâm đường phèn ngọt dịu.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.8 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping thạch đào giòn dai ngọt nhẹ."
      },
      {
        name: "Trà xoài machiato",
        price: "30,000",
        isFeatured: true,
        desc: "Cốt trà nhài hoa nhạt kết hợp xoài chín tươi giòn bằm nhỏ và lớp kem phô mai mặn béo ngậy.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping thạch phô mai tươi."
      },
      {
        name: "Trà olong sen vàng",
        price: "35,000",
        isFeatured: true,
        desc: "Cốt ô long ủ lạnh kết hợp hạt sen ninh đường phèn bùi ngọt, củ năng giòn ngọt và kem sữa mặn.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm trân châu trắng dai giòn ngọt nhẹ."
      },
      {
        name: "Trà hibicus lựu",
        price: "30,000",
        isFeatured: false,
        desc: "Trà hoa Hibiscus màu đỏ ruby chua ngọt mát gan kết hợp hạt lựu tươi giòn ngọt nước.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm thạch dừa lửa dai giòn sần sật."
      },
      {
        name: "Trà hibicus đặc thơm",
        price: "30,000",
        isFeatured: false,
        desc: "Trà atiso đỏ chua thanh mát quyện mật thơm thanh nhẹ bừng tỉnh cơ thể ngày oi bức.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm lát cam tươi thơm ngát."
      },
      {
        name: "Trà hibicus xoài",
        price: "30,000",
        isFeatured: false,
        desc: "Sự kết hợp độc đáo giữa trà hoa atiso đỏ chua thanh và thịt xoài tươi chín vàng ngọt lịm.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3.8 }
        ],
        pairing: "GỢI Ý KÈM THEO: Ăn kèm thạch dừa ngọt giòn."
      },
      {
        name: "Trà hibicus mãng cầu",
        price: "30,000",
        isFeatured: false,
        desc: "Trà hoa hibiscus đỏ ruby quyện cơm mãng cầu tươi chua chua ngọt dịu.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Uống kèm thạch dừa mát lạnh."
      },
      {
        name: "Trà đào",
        price: "30,000",
        isFeatured: false,
        desc: "Hồng trà ủ ấm kết hợp lát đào ngâm giòn ngọt và siro đào ngọt thanh mát.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.8 }
        ],
        pairing: "GỢI Ý KÈM THEO: Ăn kèm miếng đào ngâm giòn sần sật."
      },
      {
        name: "Trà thạch đào",
        price: "30,000",
        isFeatured: false,
        desc: "Trà đào truyền thống thêm thạch đào dai dẻo ngọt mát thơm mùi hương đào.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 4 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm trân châu trắng giòn ngọt."
      },
      {
        name: "Trà đào machiato",
        price: "30,000",
        isFeatured: false,
        desc: "Trà đào thanh ngọt kết hợp lớp foam phô mai muối mặn béo ngậy sánh mịn bên trên.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thưởng thức khi lạnh sảng khoái."
      },
      {
        name: "Trà xoài chanh dây",
        price: "30,000",
        isFeatured: false,
        desc: "Cốt trà lài ủ lạnh kết hợp xoài tươi bằm ngọt ngào và nước cốt chanh dây thơm lừng chua thanh.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.8 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping thạch dừa ngọt mát."
      }
    ]
  },
  {
    category: "Nước Ép",
    icon: GlassWater,
    items: [
      {
        name: "Nước chanh",
        price: "25,000",
        isFeatured: false,
        desc: "Nước cốt chanh tươi vắt nguyên chất pha đường phèn chua ngọt sảng khoái.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping sương sáo thanh mát ngày hè."
      },
      {
        name: "Nước chanh nóng",
        price: "28,000",
        isFeatured: false,
        desc: "Nước chanh tươi ấm nóng kết hợp mật ong tốt cho cổ họng và giải cảm ấm áp.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 2.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Dùng ấm nóng vào sáng sớm giải độc gan."
      },
      {
        name: "Nước ép ổi",
        price: "28,000",
        isFeatured: false,
        desc: "Ổi hồng tươi ép lạnh nguyên chất giữ trọn vẹn Vitamin C và hương vị ngọt thơm đặc trưng.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm xíu muối ớt viền ly độc lạ."
      },
      {
        name: "Nước ép thơm",
        price: "28,000",
        isFeatured: false,
        desc: "Thơm (dứa) chín ngọt ép nguyên chất chua ngọt mát lành giàu vitamin giải nhiệt.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 4 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping thạch dừa ngọt mát."
      },
      {
        name: "Nước cam",
        price: "28,000",
        isFeatured: false,
        desc: "Cam sành chín mọng vắt nguyên chất, giữ trọn vị tép cam tươi ngọt lành sảng khoái.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 4.5 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Uống đá lạnh ngọt thanh tự nhiên."
      }
    ]
  },
  {
    category: "Sữa Chua",
    icon: IceCream,
    items: [
      {
        name: "Sữa chua cốm non",
        price: "30,000",
        isFeatured: true,
        desc: "Sữa chua lên men tự nhiên mịn màng quyện cốm non xanh mềm ngọt dẻo bùi bùi.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 4 },
          { label: "ĐỘ ĐẬM VỊ", value: 3.5 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Dùng mát lạnh dẻo dính."
      },
      {
        name: "Sữa chua đá",
        price: "25,000",
        isFeatured: false,
        desc: "Sữa chua nhà làm lên men tự nhiên kết hợp đá bào tuyết nhuyễn mát lạnh chua ngọt dịu.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Topping sương sáo giòn dai mát gan."
      },
      {
        name: "Sữa chua xoài",
        price: "30,000",
        isFeatured: false,
        desc: "Sữa chua dẻo mịn phủ lớp mứt xoài cát chín thơm lừng chua ngọt ngọt ngào.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3.8 }
        ],
        pairing: "GỢI Ý KÈM THEO: Rất hợp cho các bạn nhỏ và phái nữ."
      },
      {
        name: "Sữa chua dâu",
        price: "30,000",
        isFeatured: false,
        desc: "Sữa chua nhà làm dẻo mịn phủ sốt dâu tây tươi chua ngọt dịu, kích thích tiêu hóa cực tốt.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3.8 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm thạch dừa giòn."
      },
      {
        name: "Sữa chua đặc thơm",
        price: "30,000",
        isFeatured: false,
        desc: "Sữa chua kết hợp siro đặc thơm chua thanh mộc mạc thơm lừng mùi thảo mộc tự nhiên.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Trộn đều rồi thưởng thức cùng đá bào."
      }
    ]
  },
  {
    category: "Topping",
    icon: CircleDot,
    items: [
      {
        name: "Trân châu đen / trân châu trắng",
        price: "5,000",
        isFeatured: false,
        desc: "Trân châu đen dai giòn mật ong dẻo ngọt hoặc trân châu trắng giòn ngọt nhẹ ngập nước đường.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thích hợp thêm vào tất cả các món Trà Sữa & Trà ô long."
      },
      {
        name: "Sương sáo",
        price: "5,000",
        isFeatured: false,
        desc: "Thạch sương sáo dai mềm nấu từ lá sương sáo tự nhiên thanh mát giải nhiệt.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 2 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm vào Bạc Xỉu hoặc Trà Hoa Nhài thanh nhiệt."
      },
      {
        name: "Thạch đào / dâu / dừa lửa",
        price: "5,000",
        isFeatured: false,
        desc: "Thạch đào thơm lừng giòn sần sật hoặc thạch dừa dẻo ngọt bùi.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 3.5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Cực hợp với nhóm Trà Trái Cây."
      },
      {
        name: "Phô mai tươi / mặn / cheese ball",
        price: "7,000",
        isFeatured: false,
        desc: "Topping phô mai tươi dẻo mịn béo ngậy tan chảy, hoặc viên cheese ball bùi mộc.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm vào Matcha Latte hoặc Trà Gạo Rang sữa."
      },
      {
        name: "Cốm non",
        price: "7,000",
        isFeatured: false,
        desc: "Hạt cốm non xanh mềm dẻo, thơm ngậy mùi lúa nếp non nguyên chất Hà Nội.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 2 }
        ],
        pairing: "GỢI Ý KÈM THEO: Hợp nhất khi thêm vào Sữa chua cốm non hoặc Ô Long Yến Mạch."
      },
      {
        name: "Topping kem (kem muối / kem trứng / kem phô mai)",
        price: "7,000",
        isFeatured: false,
        desc: "Lớp màng kem muối mặn béo ngậy, kem trứng ngọt ngào sánh mịn hoặc kem phô mai dẻo thơm.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 5 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 3 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thêm vào các món Trà Mộc để tạo lớp macchiato béo ngậy."
      }
    ]
  },
  {
    category: "Nước Giải Khát",
    icon: Beer,
    items: [
      {
        name: "Nước suối",
        price: "12,000",
        isFeatured: false,
        desc: "Nước uống tinh khiết đóng chai bảo quản mát thanh lọc cơ thể.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 1 },
          { label: "ĐỘ NGỌT", value: 1 }
        ],
        pairing: "GỢI Ý KÈM THEO: Tiện lợi mang đi giải khát."
      },
      {
        name: "Bò húc",
        price: "20,000",
        isFeatured: false,
        desc: "Nước tăng lực Redbull lon giúp bừng tỉnh năng lượng tức thì.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 1 },
          { label: "ĐỘ ĐẬM VỊ", value: 3 },
          { label: "ĐỘ NGỌT", value: 5 }
        ],
        pairing: "GỢI Ý KÈM THEO: Thích hợp cho các buổi học khuya cần tỉnh táo."
      }
    ]
  },
  {
    category: "Hạt",
    icon: Sun,
    items: [
      {
        name: "Hạt dưa",
        price: "15,000",
        isFeatured: false,
        desc: "Đĩa hạt dưa đỏ sấy mộc truyền thống giòn rụm nhâm nhi trò chuyện.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 1 }
        ],
        pairing: "GỢI Ý KÈM THEO: Gọi kèm bất cứ tách trà nóng nào của quán."
      },
      {
        name: "Hạt hướng dương",
        price: "15,000",
        isFeatured: false,
        desc: "Đĩa hạt hướng dương sấy giòn thơm bùi nhâm nhi kéo dài câu chuyện.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "ĐỘ BÉO NGẬY", value: 3.5 },
          { label: "ĐỘ ĐẬM VỊ", value: 2 },
          { label: "ĐỘ NGỌT", value: 1 }
        ],
        pairing: "GỢI Ý KÈM THEO: Hạt hướng dương sấy mộc nhai vui miệng."
      }
    ]
  }
];

const MENU_DATA_EN: MenuCategory[] = [
  {
    category: "Coffee",
    icon: Coffee,
    items: [
      {
        name: "Salted Coffee",
        price: "25,000",
        isFeatured: true,
        desc: "Rich Robusta coffee combined with CAM CAM's signature cream cheese salted foam.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 2 }
        ],
        pairing: "RECOMMENDED WITH: Hand-roasted rustic sunflower seeds."
      },
      {
        name: "Fresh Milk Coffee w/ Grass Jelly",
        price: "28,000",
        isFeatured: true,
        desc: "Creamy fresh milk, chewy grass jelly blended with fragrant drip filter coffee.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Add fresh cheese to double the richness."
      },
      {
        name: "Filter Black Coffee",
        price: "18,000",
        isFeatured: false,
        desc: "Traditional drip filter black coffee from robust hand-roasted Robusta beans.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 5 },
          { label: "SWEETNESS", value: 1 }
        ],
        pairing: "RECOMMENDED WITH: Traditional red melon seeds."
      },
      {
        name: "Filter Milk Coffee",
        price: "20,000",
        isFeatured: false,
        desc: "Traditional drip black coffee sweetened with rich condensed milk.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Dried sunflower seeds."
      },
      {
        name: "Machine Black Coffee",
        price: "20,000",
        isFeatured: false,
        desc: "Quick and fresh machine-brewed Espresso, mildly fragrant Arabica profile.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 1 }
        ],
        pairing: "RECOMMENDED WITH: Red melon seeds."
      },
      {
        name: "Machine Milk Coffee",
        price: "22,000",
        isFeatured: false,
        desc: "Machine-brewed Espresso blended with sweet and creamy condensed milk.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Serve with thin biscuits."
      },
      {
        name: "Sai Gon Black Coffee",
        price: "25,000",
        isFeatured: false,
        desc: "Traditional Saigon style iced black coffee, light and very refreshing.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 2 }
        ],
        pairing: "RECOMMENDED WITH: Serve with a cold glass of iced tea."
      },
      {
        name: "Sai Gon Milk Coffee",
        price: "25,000",
        isFeatured: false,
        desc: "Saigon style iced sweet milk coffee, sweet, creamy, and full of local vibe.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Enjoy on a windy rainy afternoon."
      },
      {
        name: "Egg Cream Coffee",
        price: "25,000",
        isFeatured: false,
        desc: "Hot filter coffee topped with sweet, fluffy, custard-like egg cream.",
        image: "/images/item/ca_phe_kem_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Best enjoyed when warm."
      },
      {
        name: "Bac Xiu",
        price: "25,000",
        isFeatured: false,
        desc: "A milk-forward drink with just a touch of coffee, smooth and light.",
        image: "/images/item/ca_phe_sua.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Perfect for those who prefer sweet over bitter."
      },
      {
        name: "Salted Bac Xiu",
        price: "25,000",
        isFeatured: false,
        desc: "Traditional Bac Xiu topped with salted cream to perfectly balance the sweetness.",
        image: "/images/item/ca_phe_kem_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Add chewy grass jelly."
      }
    ]
  },
  {
    category: "Cacao & Tea",
    icon: Flame,
    items: [
      {
        name: "Hot / Iced Cacao",
        price: "25,000",
        isFeatured: false,
        desc: "Pure cacao powder blended with sweet condensed milk, warm or iced.",
        image: "/images/item/cacao_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Marshmallow topping."
      },
      {
        name: "Salted Cacao Hot / Iced",
        price: "28,000",
        isFeatured: false,
        desc: "Rich cocoa topped with salted cream to make the chocolate flavors pop.",
        image: "/images/item/cacao_da.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Fresh cream cheese cubes."
      },
      {
        name: "Cacao Latte",
        price: "28,000",
        isFeatured: false,
        desc: "Pure cacao blended with steamed fresh milk and topped with smooth foam.",
        image: "/images/item/cacao_da.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Serve hot on a rainy day."
      },
      {
        name: "Herbal Ginger Tea",
        price: "28,000",
        isFeatured: false,
        desc: "Warm ginger tea base sweetened with wild honey to warm the body.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Serve with fresh lemon slice."
      }
    ]
  },
  {
    category: "Matcha",
    icon: Sprout,
    items: [
      {
        name: "Matcha Latte",
        price: "35,000",
        isFeatured: true,
        desc: "Premium Uji matcha whisked with fresh milk, preserving its natural green hue.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Add egg cream for ultimate béo."
      },
      {
        name: "Matcha Roasted Rice",
        price: "35,000",
        isFeatured: false,
        desc: "Pure matcha blended with the roasted fragrance of Japanese Genmaicha.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Chewy honey black pearls."
      },
      {
        name: "Jasmine Almond Matcha",
        price: "35,000",
        isFeatured: false,
        desc: "Jasmine aroma blended with rich almond milk and delicate matcha green tea.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Topped with toasted almond slices."
      },
      {
        name: "*Extra Gram (+Strong Tea)",
        price: "5,000",
        isFeatured: false,
        desc: "Add 1g of pure Uji matcha for tea lovers who enjoy deep earthy bitterness.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 5 },
          { label: "SWEETNESS", value: 1 }
        ],
        pairing: "RECOMMENDED WITH: Add directly to your Matcha Latte."
      }
    ]
  },
  {
    category: "Blao Tea",
    icon: CupSoda,
    items: [
      {
        name: "Blao Tea w/ Rice & Oats",
        price: "30,000",
        isFeatured: true,
        desc: "Jasmine-infused Blao milk tea combined with chewy young rice and organic oats.",
        image: "/images/item/Tra_Blao_com_non_yen_mach.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Fresh melted cream cheese topping."
      },
      {
        name: "Blao Tea w/ Black Pearls",
        price: "25,000",
        isFeatured: false,
        desc: "Traditional Blao milk tea with a floral jasmine note and chewy black pearls.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Red melon seeds."
      },
      {
        name: "Blao Tea w/ Cream Egg/Cheese",
        price: "25,000",
        isFeatured: false,
        desc: "Blao milk tea topped with sweet custard egg cream or savory cream cheese foam.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Sip the cream first, then mix the tea."
      },
      {
        name: "Blao Tea w/ Fresh Cheese",
        price: "28,000",
        isFeatured: false,
        desc: "Jasmine milk tea paired with soft, gelatinous fresh cheese cubes.",
        image: "/images/item/Tra_Blao_full_topping.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Pairs very well with fire coconut jelly."
      },
      {
        name: "Blao Tea Full Toppings",
        price: "32,000",
        isFeatured: false,
        desc: "Giant size Blao milk tea with black pearls, grass jelly, oats, and fresh cheese.",
        image: "/images/item/Tra_Blao_full_topping.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Perfect for friendly gatherings."
      }
    ]
  },
  {
    category: "Rice Tea",
    icon: Wheat,
    items: [
      {
        name: "Roasted Rice w/ Oats & Rice",
        price: "30,000",
        isFeatured: true,
        desc: "Roasted Japanese rice tea brewed with milk, chewy green rice, and organic oats.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Dried crispy young rice topping."
      },
      {
        name: "Roasted Rice w/ Pearls",
        price: "25,000",
        isFeatured: false,
        desc: "Genmaicha roasted green tea milk tea served with chewy honey black pearls.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Crunchy sunflower seeds."
      },
      {
        name: "Roasted Rice w/ Fresh Cheese",
        price: "30,000",
        isFeatured: false,
        desc: "Genmaicha milk tea paired with soft fresh cheese jelly cubes.",
        image: "/images/item/Tra_gao_rang_full_topping.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Serve cold and shaken."
      },
      {
        name: "Roasted Rice Full Toppings",
        price: "35,000",
        isFeatured: false,
        desc: "Roasted rice milk tea loaded with pearls, grass jelly, oats, and fresh cheese.",
        image: "/images/item/Tra_gao_rang_full_topping.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Satisfying treat for a long workday."
      }
    ]
  },
  {
    category: "Oolong",
    icon: Leaf,
    items: [
      {
        name: "Oolong w/ Oats & Rice",
        price: "35,000",
        isFeatured: true,
        desc: "Rich oolong tea base, creamy milk, chewy green rice, and organic oats.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 4.5 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Crispy white pearls."
      },
      {
        name: "Oolong w/ Black Pearls",
        price: "28,000",
        isFeatured: false,
        desc: "Rich oolong milk tea served with chewy honey black pearls.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 4.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Enjoy with melon seeds."
      },
      {
        name: "Oolong w/ Custard/Cheese",
        price: "35,000",
        isFeatured: false,
        desc: "Strong oolong tea base topped with custard egg cream or savory cheese foam.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 4.5 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Drink at a 45-degree angle without straw."
      },
      {
        name: "Oolong Full Toppings",
        price: "40,000",
        isFeatured: false,
        desc: "Strong oolong milk tea loaded with pearls, peach jelly, and fresh cheese.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 4.5 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Served over crushed ice."
      }
    ]
  },
  {
    category: "Almond",
    icon: Sparkles,
    items: [
      {
        name: "Almond Jasmine w/ Custard/Cheese",
        price: "30,000",
        isFeatured: true,
        desc: "Floral jasmine note combined with almond milk, topped with sweet egg custard.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 4.8 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Fresh cheese topping."
      },
      {
        name: "Almond Jasmine w/ Oats & Rice",
        price: "30,000",
        isFeatured: true,
        desc: "Unique blend of jasmine almond milk, chewy young rice, and organic oats.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Additional green rice topping."
      },
      {
        name: "Almond Jasmine w/ Black Pearls",
        price: "28,000",
        isFeatured: false,
        desc: "Rich jasmine almond milk tea served with chewy black pearls.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Sunflower seeds."
      },
      {
        name: "Almond Jasmine w/ Fresh Cheese",
        price: "30,000",
        isFeatured: false,
        desc: "Jasmine almond tea paired with soft fresh cheese jelly cubes.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Add fire coconut jelly."
      },
      {
        name: "Almond Jasmine Full Topping",
        price: "32,000",
        isFeatured: false,
        desc: "Jasmine almond tea loaded with black pearls, peach jelly, and fresh cheese.",
        image: "/images/item/matcha_latte.png",
        ratings: [
          { label: "CREAMINESS", value: 4.5 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Perfect for plant milk lovers."
      }
    ]
  },
  {
    category: "Fruit Tea",
    icon: Citrus,
    items: [
      {
        name: "Soursop Tea",
        price: "30,000",
        isFeatured: true,
        desc: "Cold brewed jasmine green tea served with sweet & sour marinated soursop pulp.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Crunchy fire coconut jelly."
      },
      {
        name: "Special Jasmine Tea",
        price: "30,000",
        isFeatured: true,
        desc: "Pure jasmine tea cold-brewed and sweetened with house-infused syrup.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Sunflower seeds."
      },
      {
        name: "Pink Guava & Strawberry Tea",
        price: "30,000",
        isFeatured: true,
        desc: "Cold brewed black tea blended with pink guava jam and sweet strawberry slices.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.8 }
        ],
        pairing: "RECOMMENDED WITH: Sweet and crispy peach jelly."
      },
      {
        name: "Mango Macchiato",
        price: "30,000",
        isFeatured: true,
        desc: "Jasmine tea blended with fresh minced mango, topped with savory cheese foam.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Fresh cheese topping."
      },
      {
        name: "Golden Lotus Oolong",
        price: "35,000",
        isFeatured: true,
        desc: "Cold brewed oolong tea paired with sweet lotus seeds, water chestnut, and cream cheese.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Crispy white pearls."
      },
      {
        name: "Pomegranate Hibiscus",
        price: "30,000",
        isFeatured: false,
        desc: "Tart ruby-red hibiscus tea served with fresh crunchy pomegranate seeds.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Chewy fire coconut jelly."
      },
      {
        name: "Special Sweet Hibiscus",
        price: "30,000",
        isFeatured: false,
        desc: "Tart hibiscus tea sweetened with mild herbal syrup to refresh the body.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Fresh orange slice."
      },
      {
        name: "Mango Hibiscus",
        price: "30,000",
        isFeatured: false,
        desc: "Unique blend of tart hibiscus tea and sweet ripe mango cubes.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3.8 },
          { label: "SWEETNESS", value: 3.8 }
        ],
        pairing: "RECOMMENDED WITH: Coconut jelly."
      },
      {
        name: "Soursop Hibiscus",
        price: "30,000",
        isFeatured: false,
        desc: "Ruby hibiscus tea combined with sweet and sour soursop pulp.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Iced coconut jelly."
      },
      {
        name: "Peach Tea",
        price: "30,000",
        isFeatured: false,
        desc: "Black tea brewed with sweet peach slices and fresh peach syrup.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.8 }
        ],
        pairing: "RECOMMENDED WITH: Sweet marinated peach slice."
      },
      {
        name: "Peach Jelly Tea",
        price: "30,000",
        isFeatured: false,
        desc: "Traditional peach tea with sweet, chewy peach gelatin cubes.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 4 }
        ],
        pairing: "RECOMMENDED WITH: Crispy white pearls."
      },
      {
        name: "Peach Macchiato",
        price: "30,000",
        isFeatured: false,
        desc: "Sweet peach tea topped with savory, salty cream cheese foam.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Drink chilled."
      },
      {
        name: "Mango Passionfruit Tea",
        price: "30,000",
        isFeatured: false,
        desc: "Jasmine tea blended with sweet mango and tart passionfruit juice.",
        image: "/images/item/tra_sen_vang.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.8 }
        ],
        pairing: "RECOMMENDED WITH: Sweet coconut jelly."
      }
    ]
  },
  {
    category: "Fresh Juice",
    icon: GlassWater,
    items: [
      {
        name: "Lime Juice",
        price: "25,000",
        isFeatured: false,
        desc: "Freshly squeezed lime juice sweetened with mild syrup.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Grass jelly topping."
      },
      {
        name: "Hot Lime Juice",
        price: "28,000",
        isFeatured: false,
        desc: "Warm fresh lime juice sweetened with honey to soothe the throat.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 2.5 }
        ],
        pairing: "RECOMMENDED WITH: Perfect morning detox drink."
      },
      {
        name: "Guava Juice",
        price: "28,000",
        isFeatured: false,
        desc: "Cold pressed pink guava juice, preserving its rich Vitamin C.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Add a tiny pinch of chili salt."
      },
      {
        name: "Pineapple Juice",
        price: "28,000",
        isFeatured: false,
        desc: "Cold pressed sweet pineapple juice, refreshing and tropical.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 4 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Coconut jelly."
      },
      {
        name: "Orange Juice",
        price: "28,000",
        isFeatured: false,
        desc: "Freshly squeezed orange juice containing pulps for a fresh texture.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 4.5 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Served chilled."
      }
    ]
  },
  {
    category: "Yogurt",
    icon: IceCream,
    items: [
      {
        name: "Yogurt w/ Green Rice",
        price: "30,000",
        isFeatured: true,
        desc: "Naturally fermented smooth yogurt combined with chewy young rice.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 4 },
          { label: "STRENGTH", value: 3.5 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Eat chilled and enjoy the chewiness."
      },
      {
        name: "Iced Yogurt",
        price: "25,000",
        isFeatured: false,
        desc: "House-made yogurt blended with shaved ice for a sweet and sour slushy.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Grass jelly topping."
      },
      {
        name: "Mango Yogurt",
        price: "30,000",
        isFeatured: false,
        desc: "Creamy yogurt topped with sweet ripe mango compote.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3.8 }
        ],
        pairing: "RECOMMENDED WITH: Perfect choice for kids and ladies."
      },
      {
        name: "Strawberry Yogurt",
        price: "30,000",
        isFeatured: false,
        desc: "Creamy house-made yogurt topped with sweet & sour strawberry compote.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3.8 }
        ],
        pairing: "RECOMMENDED WITH: Crunchy coconut jelly."
      },
      {
        name: "Special Herbal Yogurt",
        price: "30,000",
        isFeatured: false,
        desc: "House-made yogurt flavored with a dash of sweet herbal syrup.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Mix well before eating with shaved ice."
      }
    ]
  },
  {
    category: "Toppings",
    icon: CircleDot,
    items: [
      {
        name: "Black / White Pearls",
        price: "5,000",
        isFeatured: false,
        desc: "Chewy honey-infused black pearls or crunchy white konjac pearls.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Fits perfectly in milk teas & oolong teas."
      },
      {
        name: "Grass Jelly",
        price: "5,000",
        isFeatured: false,
        desc: "Soft herbal grass jelly made from natural jelly leaves, cooling and refreshing.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 2 }
        ],
        pairing: "RECOMMENDED WITH: Add to Bac Xiu or Jasmine tea."
      },
      {
        name: "Peach / Strawberry / Coconut Jelly",
        price: "5,000",
        isFeatured: false,
        desc: "Fragrant, crunchy peach jelly or sweet chewy fire coconut jelly.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 3.5 }
        ],
        pairing: "RECOMMENDED WITH: Great addition to Fruit Teas."
      },
      {
        name: "Fresh Cheese / Cheese Ball",
        price: "7,000",
        isFeatured: false,
        desc: "Soft fresh cheese cubes melting in the mouth, or savory cheese balls.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Best in Matcha Latte or Roasted Rice tea."
      },
      {
        name: "Green Rice",
        price: "7,000",
        isFeatured: false,
        desc: "Chewy and aromatic young green rice grains from Hanoi.",
        image: "/images/item/tra_gao_rang_tran_chau_den.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 2 }
        ],
        pairing: "RECOMMENDED WITH: Best in Yogurt w/ Green Rice or Oolong w/ Oats."
      },
      {
        name: "Cream Topping (Salted/Egg/Cheese)",
        price: "7,000",
        isFeatured: false,
        desc: "Salted cream foam, sweet egg custard foam, or thick savory cheese foam.",
        image: "/images/item/ca_phe_muoi.png",
        ratings: [
          { label: "CREAMINESS", value: 5 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 3 }
        ],
        pairing: "RECOMMENDED WITH: Add to any tea to create a creamy macchiato layer."
      }
    ]
  },
  {
    category: "Soft Drinks",
    icon: Beer,
    items: [
      {
        name: "Mineral Water",
        price: "12,000",
        isFeatured: false,
        desc: "Pure bottled mineral water served chilled.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 1 },
          { label: "SWEETNESS", value: 1 }
        ],
        pairing: "RECOMMENDED WITH: Convenient hydration on-the-go."
      },
      {
        name: "Redbull",
        price: "20,000",
        isFeatured: false,
        desc: "Energy drink in can to boost your focus and energy instantly.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 1 },
          { label: "STRENGTH", value: 3 },
          { label: "SWEETNESS", value: 5 }
        ],
        pairing: "RECOMMENDED WITH: Perfect for late night study sessions."
      }
    ]
  },
  {
    category: "Seeds",
    icon: Sun,
    items: [
      {
        name: "Red Melon Seeds",
        price: "15,000",
        isFeatured: false,
        desc: "A plate of red melon seeds, crispy and perfect for chatting.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 1 }
        ],
        pairing: "RECOMMENDED WITH: Pairs well with any hot teas."
      },
      {
        name: "Sunflower Seeds",
        price: "15,000",
        isFeatured: false,
        desc: "A plate of crispy toasted sunflower seeds to keep conversations going.",
        image: "/images/item/sua_chua_da.png",
        ratings: [
          { label: "CREAMINESS", value: 3.5 },
          { label: "STRENGTH", value: 2 },
          { label: "SWEETNESS", value: 1 }
        ],
        pairing: "RECOMMENDED WITH: Best served with hot oolong tea."
      }
    ]
  }
];

interface MenuSectionProps {
  className?: string;
}

export function MenuSection({ className }: MenuSectionProps) {
  const { lang } = useLanguage();
  const t = translations[lang].menu;
  const { ref, isInView } = useScrollAnimation();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const currentMenuData = lang === "vi" ? MENU_DATA_VI : MENU_DATA_EN;
  const [activeItem, setActiveItem] = useState<MenuItem>(currentMenuData[0].items[0]);

  // Keep active item in sync when language switches or category changes
  const activeItemName = activeItem?.name || "";
  useEffect(() => {
    const currentCatItems = currentMenuData[activeCategoryIndex]?.items || [];
    // Try to find the item with the same name or default to first
    const matchedItem = currentCatItems.find(
      (item) => item.name.toLowerCase() === activeItemName.toLowerCase()
    ) || currentCatItems[0];
    
    if (matchedItem) {
      setActiveItem(matchedItem);
    }
  }, [activeCategoryIndex, lang, currentMenuData, activeItemName]);

  return (
    <section
      ref={ref}
      id="thuc-don"
      className={cn(
        "py-24 px-4 bg-paper-warm border-t border-border-taupe/30 relative overflow-hidden",
        className
      )}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
        <Image
          src="/images/background/6.png"
          alt="Vintage background texture"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Expanded Container Width: max-w-7xl (Takes up wider space exactly like the red box) */}
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid Layout containing Sidebar (Left), Content List (Middle) and Spotlight Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Sidebar Title (Columns 1-3) - Animates sequentially */}
          <div className="lg:col-span-3 space-y-6 flex flex-col justify-center lg:pr-4">
            <div
              style={{ transitionDelay: "0ms" }}
              className={cn(
                "flex items-center gap-3 animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              <span className="w-10 h-10 rounded-full border border-border-taupe/40 flex items-center justify-center font-serif font-black text-sm text-olive-primary bg-beige-vintage/35">
                04
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-olive-primary">
                {t.subtitle}
              </span>
            </div>
            <h2
              style={{ transitionDelay: "200ms" }}
              className={cn(
                "text-3xl md:text-5xl font-serif font-black text-espresso-dark leading-[1.15] tracking-tight uppercase animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.title}
            </h2>
            <p
              style={{ transitionDelay: "400ms" }}
              className={cn(
                "text-taupe-gray text-sm leading-relaxed font-medium font-sans animate-slide-in-left duration-700",
                isInView && "in-view"
              )}
            >
              {t.description}
            </p>
          </div>

          {/* Columns 4-12: The Interactive Menu Board (Wider Menu Box) */}
          <div
            style={{ transitionDelay: "300ms" }}
            className={cn(
              "lg:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-6 p-6 md:p-8 bg-latte-light/15 rounded-3xl border-2 border-border-taupe/40 shadow-vintage-lg bg-paper-warm/40 backdrop-blur-sm relative animate-slide-up duration-700",
              isInView && "in-view"
            )}
          >
            
            {/* Corner Ornaments */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-border-taupe/40"></div>
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-border-taupe/40"></div>
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-border-taupe/40"></div>
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-border-taupe/40"></div>

            {/* Content List & Category Tabs (Columns 1-7 of Content Area) */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Category Tabs Wrapper */}
              <div className="space-y-4">
                {/* Horizontal Scrollable Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-2 px-2">
                  {currentMenuData.map((cat, idx) => {
                    const IconComponent = cat.icon;
                    const isActive = activeCategoryIndex === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveCategoryIndex(idx)}
                        className={cn(
                          "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 snap-start border",
                          isActive
                            ? "bg-olive-primary text-paper-warm border-olive-primary shadow-vintage-sm"
                            : "bg-paper-warm/60 text-espresso-dark/80 border-border-taupe/30 hover:border-olive-primary/50"
                        )}
                      >
                        <IconComponent className="w-3.5 h-3.5" />
                        <span className="font-serif uppercase tracking-wider">{cat.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Items List (max height with scrollable container) */}
              <div className="flex-grow overflow-y-auto max-h-[460px] pr-2 space-y-3 scrollbar-thin">
                {currentMenuData[activeCategoryIndex]?.items.map((item, idx) => {
                  const isActive = activeItem.name === item.name;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveItem(item)}
                      onClick={() => setActiveItem(item)}
                      className={cn(
                        "p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 group",
                        isActive
                          ? "bg-latte-light/45 border-olive-primary/40 shadow-vintage-sm"
                          : "bg-paper-warm/30 border-border-taupe/20 hover:border-olive-primary/30"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Mini image thumbnail */}
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-latte-light/25 flex-shrink-0 border border-border-taupe/20 p-1">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="48px"
                            className="object-contain p-0.5 group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {item.isFeatured && (
                              <span className="text-olive-primary shrink-0 text-sm" title="Sản phẩm nổi bật / Nên thử">
                                ★
                              </span>
                            )}
                            <h4 className="font-serif font-bold text-sm md:text-base text-espresso-dark group-hover:text-olive-primary transition-colors truncate">
                              {item.name}
                            </h4>
                          </div>
                          <p className="text-taupe-gray text-xs truncate max-w-[200px] md:max-w-[260px] mt-0.5 font-sans font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-olive-primary text-sm md:text-base font-sans shrink-0">
                        {item.price}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Spotlight Card (Columns 8-12 of Content Area) */}
            <div className="md:col-span-5 flex">
              {activeItem && (
                <div className="w-full bg-latte-light/35 rounded-3xl border border-border-taupe/40 shadow-vintage-md p-6 flex flex-col justify-between space-y-6 relative overflow-hidden bg-paper-warm/50">
                  
                  {/* Vintage Top Accent */}
                  <div className="flex justify-between items-center relative z-10">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-olive-primary border border-olive-primary/20 px-2 py-0.5 rounded bg-olive-primary/5">
                      {activeItem.isFeatured ? (lang === "vi" ? "★ NÊN THỬ" : "★ SIGNATURE") : "RECOMMENDED"}
                    </span>
                    <Bookmark className="w-4 h-4 text-olive-primary fill-olive-primary/10" />
                  </div>

                  {/* Big Drink Image - with Glow Sparkle */}
                  <div className="relative w-full aspect-square max-h-[180px] flex items-center justify-center mx-auto z-10 p-2">
                    {/* Glowing Aura Sparkle behind image */}
                    <div className="aura-sparkle opacity-100 scale-90" />
                    <Image
                      src={activeItem.image}
                      alt={activeItem.name}
                      fill
                      sizes="180px"
                      className="object-contain p-1 transform hover:scale-105 transition-transform duration-500 z-10"
                    />
                  </div>

                  {/* Info and Ratings */}
                  <div className="space-y-4 relative z-10 flex-grow flex flex-col justify-end">
                    <div className="space-y-1">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-espresso-dark leading-tight">
                        {activeItem.name}
                      </h3>
                      <span className="text-sm font-bold text-olive-primary block font-sans">
                        {activeItem.price} VND
                      </span>
                    </div>

                    <p className="text-taupe-gray text-xs leading-relaxed font-medium font-sans">
                      {activeItem.desc}
                    </p>

                    {/* Sensory Ratings */}
                    <div className="space-y-1.5 pt-2 border-t border-border-taupe/20">
                      {activeItem.ratings.map((rate, rIdx) => (
                        <div key={rIdx} className="flex justify-between items-center text-[10px] font-bold text-espresso-dark font-sans tracking-wide">
                          <span>{rate.label}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, starI) => (
                              <div
                                key={starI}
                                className={cn(
                                  "w-2 h-2 rounded-full border border-olive-primary",
                                  starI < Math.floor(rate.value)
                                    ? "bg-olive-primary"
                                    : rate.value % 1 !== 0 && starI === Math.floor(rate.value)
                                    ? "bg-olive-primary/50"
                                    : "bg-transparent"
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pairing Suggestion Box */}
                    <div className="p-3 bg-paper-warm/85 rounded-xl border border-border-taupe/30 text-[10px] font-bold text-olive-primary tracking-wide leading-relaxed font-sans">
                      {activeItem.pairing}
                    </div>

                  </div>

                </div>
              )}
            </div>

          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-xs text-taupe-gray italic font-medium">
          {t.footerNote}
        </div>

      </div>
    </section>
  );
}

export default MenuSection;
