# Code Review Quick Reference

## Must Check ⚠️
- [ ] Security: Input validation, auth checks, no credentials
- [ ] Tests: New code tested, all tests pass
- [ ] Breaking changes: Documented with migration path
- [ ] Error handling: Comprehensive and user-friendly
- [ ] Performance: No N+1 queries, efficient algorithms

## Should Check ✓
- [ ] Code quality: DRY, clear naming, focused functions
- [ ] Edge cases: Null/empty/zero values handled
- [ ] Documentation: Comments for complex logic, README updated
- [ ] Accessibility: Keyboard nav, ARIA labels, contrast (UI changes)
- [ ] Browser compatibility: Cross-browser tested

## Review Etiquette 🤝
- Assume good intent
- Ask questions, don't command
- Praise good solutions
- Provide specific, actionable feedback
- Test locally when possible

## Decision Guide 🚦
- ✅ **Approve**: All critical items pass, minor issues noted
- 💬 **Comment**: Discussion needed, non-blocking questions
- 🚫 **Request Changes**: Blocking issues (security, bugs, breaking changes)