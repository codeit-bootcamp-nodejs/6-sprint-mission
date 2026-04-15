// TODO) User-Controller: 요청 처리
import type { Request, Response } from 'express';
import { userService } from '../services/user-service.js';
import { authService } from '../services/auth-service.js';
import { productService } from '../services/product-service.js';

export const userController = {
  // 1) 회원가입
  async register(req: Request, res: Response) {
    const { email, password, nickname, image } = req.body;
    const user = await userService.registerUser({
      email,
      password,
      nickname,
      image,
    });

    // 1-1) 토큰 생성
    const tokens = await authService.generateTokens(user);

    // 1-2) 토큰 생성 시 쿠키 옵션 설정
    if (tokens.refreshToken) {
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    if (tokens.accessToken) {
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    res.status(201).json({
      success: true,
      message: '회원가입 완료',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          image: user.image,
        },
      },
    });
  },

  // 2) 로그인
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.loginUser(email, password);

    // 2-1) 토큰 생성
    const tokens = await authService.generateTokens(user);

    // 2-2) 토큰 생성 시 쿠키 옵션 설정
    if (tokens.refreshToken) {
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    if (tokens.accessToken) {
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      });
    }

    res.status(200).json({
      success: true,
      message: '로그인 성공',
      data: {
        user: {
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          image: user.image,
        },
      },
    });
  },

  // 3) 토큰 재발급
  async refresh(req: Request, res: Response) {
    // 3-1) 토큰 찾기 (쿠키 먼저, 없을 시 바디)
    const refreshToken = (req.cookies?.refreshToken ||
      req.body?.refreshToken) as string | undefined;

    // 3-2) 토큰 검증
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'refreshToken이 없습니다',
      });
    }

    // 3-3) 토큰 생성
    const accessToken = await authService.rotateAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: '토큰 재발급 성공',
      accessToken,
    });
  },

  // 4) 로그아웃
  async logout(req: Request, res: Response) {
    // 4-1) 사용자 ID 추출 및 검증
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: '인증 정보가 없습니다',
      });
    }

    // 4-2) DB 토큰 제거
    await authService.clearRefreshToken(userId);

    // 4-3) 브라우저 쿠키 제거
    res.clearCookie('refreshToken');

    res.status(200).json({
      success: true,
      message: '로그아웃 완료',
    });
  },

  // 5) 내 정보 조회
  async me(req: Request, res: Response) {
    const user = await userService.getMe(req.user!.id);

    res.status(200).json({
      success: true,
      message: '인증 성공',
      data: user,
    });
  },

  // 6) 프로필 수정
  async updateName(req: Request, res: Response) {
    const profile = await userService.changeProfile(req.user!.id, {
      nickname: req.body.nickname,
      image: req.body.image,
    });

    res.status(200).json({
      success: true,
      message: '프로필이 변경되었습니다',
      data: profile,
    });
  },

  // 7) 비밀번호 변경
  async updatePassword(req: Request, res: Response) {
    await userService.changePassword(
      req.user!.id,
      req.body.oldPw,
      req.body.newPw
    );

    res.status(200).json({
      success: true,
      message: '비밀번호가 변경되었습니다',
    });
  },

  // 8) 회원 탈퇴
  async removeAccount(req: Request, res: Response) {
    await userService.deleteAccount(req.user!.id);

    res.status(200).json({
      success: true,
      message: '계정이 삭제되었습니다',
    });
  },

  // 9) 내가 등록한 상품 조회
  async myProducts(req: Request, res: Response) {
    const products = await productService.listByUser(req.user!.id);

    res.status(200).json({
      success: true,
      message: '내가 등록한 상품 목록 조회 성공',
      data: products,
    });
  },
};
