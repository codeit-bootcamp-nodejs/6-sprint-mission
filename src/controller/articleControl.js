import express from 'express';
import articleService from '../service/articleService.js';

// 게시물 등록, 수정, 삭제: 토큰 인증된 유저만 가능
async function post(req, res) {
  const article = await articleService.post(req.user.id, req.body);
  console.log(`Article_${article.id} posted successfully by user${req.user.id}`);
  res.status(201).send(article);
}

// 게시물 수정
async function patch(req, res) {
  const article = await articleService.patch(req.user.id, req.params.articleId, req.body);
  console.log(`Article_${req.params.articleId} edited by user${req.user.id}`);
  res.status(200).send(article);
}

// 게시물 삭제
async function erase(req, res) {
  const article = await articleService.erase(req.user.id, req.params.articleId);
  console.log(`Article_${req.params.articleId} deleted by user${req.user.id}`);
  res.status(204).send(article);
}

// 게시물 목록 조회와 상세 조회: 누구나 가능
async function getList(req, res) {
  const { offset, limit, order, title, content } = req.query;
  const articles = await articleService.getList(offset, limit, order, title, content);
  console.log('Article list fetched');
  res.status(200).send(articles);
}

// 게시물 상세 조회
async function get(req, res) {
  const article = await articleService.get(req.params.articleId);
  console.log('Article fetched (in detail)');
  res.status(200).send(article);
}

export default {
  post,
  patch,
  erase,
  getList,
  get
};
