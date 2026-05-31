import {
  BarChart3,
  Building2,
  FileText,
  Flag,
  Megaphone,
  Users,
} from "lucide-react";
import { AdminFeature } from "../types/admin";

export const adminFeatures: AdminFeature[] = [
  {
    title: "암장 관리",
    description: "암장 브랜드와 지점 정보를 등록하고 관리합니다.",
    icon: Building2,
    href: "/admin/gyms",
    active: true,
    stats: "브랜드 / 지점 관리",
  },
  {
    title: "회원 관리",
    description: "사용자 목록, 권한, 제재 내역을 관리합니다.",
    icon: Users,
    active: false,
  },
  {
    title: "게시글 관리",
    description: "커뮤니티 게시글과 댓글을 모니터링합니다.",
    icon: FileText,
    active: false,
  },
  {
    title: "신고 관리",
    description: "접수된 신고 내역을 확인하고 처리합니다.",
    icon: Flag,
    active: false,
  },
  {
    title: "공지사항 관리",
    description: "서비스 공지사항과 이벤트를 등록합니다.",
    icon: Megaphone,
    active: false,
  },
  {
    title: "통계 관리",
    description: "서비스 이용 지표와 성장 데이터를 확인합니다.",
    icon: BarChart3,
    active: false,
  },
];
