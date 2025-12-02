# Code Review Checklist

## Purpose
This checklist standardizes code review practices to ensure consistent quality, catch common pitfalls, and facilitate constructive feedback across the team.

---

## 🎯 Review Objectives
- Ensure code quality and maintainability
- Catch bugs and potential issues early
- Share knowledge across the team
- Maintain consistent coding standards
- Improve security and performance

---

## 📋 Before You Start Reviewing

### Preparation
- [ ] Understand the context (read PR description and linked issues)
- [ ] Check out the branch locally if needed for testing
- [ ] Review the changes in logical order (start with tests, then implementation)
- [ ] Set aside adequate time (don't rush reviews)
- [ ] Approach with a constructive mindset

---

## 1️⃣ PR Structure & Documentation

### PR Description Quality
- [ ] **Title is clear and descriptive**
  - ❌ "Fix bug"
  - ✅ "[Bug] Fix null pointer exception in user authentication"

- [ ] **Description explains WHAT and WHY**
  - What changes were made?
  - Why were they necessary?
  - What problem does this solve?

- [ ] **Related issues are linked**
  - Uses keywords: Fixes #123, Closes #456, Related to #789

- [ ] **Breaking changes are clearly documented**
  - Migration steps provided if applicable

- [ ] **Screenshots/GIFs included for UI changes**

### Size & Scope
- [ ] **PR is focused on a single concern**
  - ⚠️ Red flag: Mixing features, bug fixes, and refactoring
  - ✅ Good: One feature or one bug fix per PR

- [ ] **PR size is reasonable (< 400 lines ideal)**
  - If larger, suggest breaking into smaller PRs

- [ ] **No unrelated changes included**
  - Check for accidental formatting changes
  - Check for debug code or commented blocks

---

## 2️⃣ Code Quality & Design

### Architecture & Design
- [ ] **Changes follow existing architecture patterns**
  - Consistent with project structure
  - Follows MVC, MVVM, or other established patterns

- [ ] **Proper separation of concerns**
  - Business logic separated from presentation
  - Data layer isolated from UI layer

- [ ] **Code is DRY (Don't Repeat Yourself)**
  - No duplicate code blocks
  - Shared functionality extracted to utilities

- [ ] **Appropriate use of design patterns**
  - Patterns used where beneficial
  - No over-engineering

- [ ] **Dependencies are minimal and justified**
  - No unnecessary libraries added
  - Existing solutions used when possible

### Code Structure
- [ ] **Functions/methods are focused and single-purpose**
  - Each function does one thing well
  - Functions are < 50 lines (guideline)

- [ ] **Classes have clear responsibilities**
  - Follow Single Responsibility Principle
  - Class size is reasonable

- [ ] **Proper naming conventions followed**
  - Variables: descriptive and meaningful
  - Functions: verb-based (getUserData, calculateTotal)
  - Classes: noun-based (UserManager, OrderProcessor)
  - Constants: UPPER_SNAKE_CASE

- [ ] **Magic numbers and strings are avoided**
  - ❌ `if (status === 404)`
  - ✅ `if (status === HTTP_NOT_FOUND)`

- [ ] **Code is readable without excessive comments**
  - Self-documenting code preferred
  - Complex logic explained with comments

---

## 3️⃣ Functionality & Logic

### Correctness
- [ ] **Code does what it claims to do**
  - Test the changes locally if possible
  - Verify against acceptance criteria

- [ ] **Edge cases are handled**
  - Empty arrays/objects
  - Null/undefined values
  - Zero values
  - Very large numbers
  - Special characters in strings

- [ ] **Error handling is comprehensive**
  - Try-catch blocks where appropriate
  - Errors are logged meaningfully
  - User-friendly error messages

- [ ] **Business logic is correct**
  - Calculations are accurate
  - Workflows make sense
  - State transitions are valid

### Common Pitfalls
- [ ] **No race conditions or timing issues**
  - Async operations handled properly
  - Promises resolved correctly
  - Event listeners cleaned up

- [ ] **No memory leaks**
  - Event listeners removed when no longer needed
  - Intervals/timeouts cleared
  - References released appropriately

- [ ] **No infinite loops or recursion without base case**

- [ ] **Off-by-one errors avoided**
  - Array indexing correct
  - Loop boundaries correct

- [ ] **Type coercion handled carefully**
  - === used instead of == (JavaScript)
  - Explicit type conversions when needed

---

## 4️⃣ Testing

### Test Coverage
- [ ] **New code has appropriate tests**
  - Unit tests for functions/methods
  - Integration tests for workflows
  - E2E tests for critical paths

- [ ] **Tests are meaningful and test behavior**
  - Not just testing implementation details
  - Test business logic and outcomes

- [ ] **Tests cover happy paths**
  - Normal, expected scenarios work

- [ ] **Tests cover edge cases**
  - Boundary conditions
  - Error scenarios
  - Unusual inputs

- [ ] **All tests pass**
  - CI/CD pipeline green
  - No flaky tests

- [ ] **Test names are descriptive**
  - ❌ `test1()`, `testUserFunction()`
  - ✅ `shouldReturnErrorWhenUserNotFound()`

### Test Quality
- [ ] **Tests are independent**
  - No test depends on another test's state
  - Tests can run in any order

- [ ] **Tests are fast**
  - No unnecessary delays or sleeps
  - Mocks used appropriately

- [ ] **No tests are skipped/commented out**
  - If temporarily disabled, reason documented

---

## 5️⃣ Security

### Authentication & Authorization
- [ ] **Authentication checks are in place**
  - Users must be logged in for protected routes
  - Tokens validated properly

- [ ] **Authorization is enforced**
  - Users can only access their own data
  - Role-based access control implemented

- [ ] **No credentials in code**
  - No hardcoded passwords, API keys, tokens
  - Secrets use environment variables or secret management

### Input Validation
- [ ] **All user input is validated**
  - Client-side validation present
  - Server-side validation enforced (never trust client)

- [ ] **SQL injection prevention**
  - Parameterized queries used
  - ORM used correctly

- [ ] **XSS (Cross-Site Scripting) prevention**
  - User input sanitized before rendering
  - Proper escaping in templates

- [ ] **CSRF protection implemented**
  - CSRF tokens used for state-changing operations

### Data Security
- [ ] **Sensitive data is encrypted**
  - Passwords hashed (bcrypt, Argon2)
  - PII encrypted at rest and in transit

- [ ] **No sensitive data in logs**
  - Passwords, tokens, PII not logged
  - Debug statements removed

- [ ] **Secure HTTP headers set**
  - Content-Security-Policy
  - X-Frame-Options
  - Strict-Transport-Security

- [ ] **Dependencies have no known vulnerabilities**
  - npm audit / pip check run
  - Dependabot alerts addressed

---

## 6️⃣ Performance

### Efficiency
- [ ] **No unnecessary database queries**
  - N+1 query problem avoided
  - Eager loading used where appropriate
  - Queries optimized with indexes

- [ ] **Appropriate data structures used**
  - HashMap for O(1) lookups vs array search
  - Set for uniqueness checks

- [ ] **Algorithms are efficient**
  - Time complexity is reasonable
  - No nested loops when avoidable

- [ ] **Caching used appropriately**
  - Expensive operations cached
  - Cache invalidation handled

### Resource Usage
- [ ] **No memory leaks**
  - Objects dereferenced when no longer needed
  - Large objects handled carefully

- [ ] **File handles closed properly**
  - Files closed after reading/writing
  - Database connections released

- [ ] **Lazy loading used for large datasets**
  - Pagination implemented
  - Infinite scroll or load-more patterns

- [ ] **Assets optimized**
  - Images compressed
  - CSS/JS minified for production
  - Fonts subset if possible

---

## 7️⃣ Accessibility (for UI changes)

### Keyboard Navigation
- [ ] **All interactive elements keyboard accessible**
  - Tab order logical
  - Enter/Space activate buttons

- [ ] **Focus states visible**
  - Clear visual indicator when element focused
  - No outline: none without alternative

- [ ] **No keyboard traps**
  - Users can navigate away from modals, dropdowns

### Screen Reader Support
- [ ] **Semantic HTML used**
  - Proper heading hierarchy (h1, h2, h3)
  - Lists use <ul> or <ol>
  - Buttons use <button>, links use <a>

- [ ] **ARIA labels provided where needed**
  - aria-label for icon-only buttons
  - aria-labelledby for form fields
  - aria-live for dynamic content

- [ ] **Alt text for images**
  - Descriptive alt text for meaningful images
  - Empty alt="" for decorative images

### Visual Accessibility
- [ ] **Color contrast meets WCAG AA standards**
  - Text contrast ratio ≥ 4.5:1
  - Large text ≥ 3:1

- [ ] **Color not sole indicator**
  - Error states use icons + text, not just red color
  - Links distinguishable by underline, not just color

- [ ] **Text is resizable**
  - Layout doesn't break at 200% zoom
  - Font sizes relative (rem, em)

---

## 8️⃣ Browser & Device Compatibility

### Cross-Browser Testing
- [ ] **Works in major browsers**
  - Chrome, Firefox, Safari, Edge tested
  - Polyfills used for newer features

- [ ] **No browser-specific code without fallbacks**
  - Feature detection used, not user-agent sniffing

### Responsive Design
- [ ] **Mobile-first or mobile-compatible**
  - Works on phone screens (< 768px)
  - Touch targets ≥ 44x44px

- [ ] **Breakpoints handled properly**
  - Tablet and desktop views tested
  - No horizontal scrolling

---

## 9️⃣ Error Handling & Logging

### Error Handling
- [ ] **Errors caught and handled gracefully**
  - User sees helpful error messages
  - Application doesn't crash

- [ ] **Fail-safes for critical operations**
  - Retry logic for network requests
  - Fallback values for missing data

- [ ] **Validation errors clear and actionable**
  - User knows what went wrong
  - Instructions to fix provided

### Logging
- [ ] **Important operations logged**
  - Authentication attempts
  - State changes
  - Errors with stack traces

- [ ] **Log levels used appropriately**
  - DEBUG for development details
  - INFO for business events
  - WARN for recoverable issues
  - ERROR for failures

- [ ] **No excessive logging**
  - Not logging in tight loops
  - Sensitive data not logged

---

## 🔟 Documentation

### Code Comments
- [ ] **Complex logic explained**
  - Why, not what (code shows what)
  - Edge cases documented

- [ ] **TODOs are tracked**
  - TODO comments have context
  - Better: create issues instead

- [ ] **No commented-out code**
  - Delete it (git history preserves it)

### External Documentation
- [ ] **README updated if needed**
  - Setup instructions current
  - New features documented

- [ ] **API documentation updated**
  - New endpoints documented
  - Request/response examples provided

- [ ] **Changelog updated**
  - User-facing changes noted

---

## 1️⃣1️⃣ Git Practices

### Commits
- [ ] **Commits are atomic**
  - Each commit is a logical unit
  - Could be cherry-picked independently

- [ ] **Commit messages are clear**
  - Format: `[Type] Subject` or `Type: Subject`
  - Body explains why if needed

- [ ] **No merge commits in feature branch**
  - Branch rebased on target if needed

### Branch Management
- [ ] **Branch name follows convention**
  - feature/description, bugfix/issue-number
  - Descriptive and concise

- [ ] **Branch is up-to-date with target**
  - Merged or rebased recent changes

---

## 1️⃣2️⃣ Deployment Considerations

### Configuration
- [ ] **Environment-specific configs handled**
  - No production credentials in dev
  - Feature flags used appropriately

- [ ] **Database migrations included and tested**
  - Up migration works
  - Down migration works (rollback)

### Monitoring
- [ ] **Metrics added for new features**
  - Usage tracking
  - Performance monitoring

- [ ] **Alerts configured for errors**
  - Error rates monitored
  - On-call team notified

---

## ✅ Review Completion Checklist

After reviewing all sections:

- [ ] I have tested the changes locally (if applicable)
- [ ] I have checked all relevant sections above
- [ ] My feedback is constructive and specific
- [ ] I've noted both positives and areas for improvement
- [ ] I've asked questions where I'm unsure
- [ ] I've suggested alternatives rather than just criticizing
- [ ] My tone is professional and respectful

---

## 💡 How to Use This Checklist

### For Reviewers:
1. **Not every section applies to every PR** - Use judgment
2. **Focus on high-impact items first** - Security, correctness, breaking changes
3. **Be thorough but pragmatic** - Don't nitpick formatting if auto-formatters exist
4. **Provide examples** - Show, don't just tell
5. **Acknowledge good work** - Call out clever solutions and good practices

### For Authors:
1. **Self-review using this checklist before requesting review**
2. **Address items proactively in PR description**
3. **Use checklist to anticipate reviewer concerns**

---

## 🚦 Review Decision Guide

### ✅ Approve
- All critical items pass
- Minor issues can be addressed in follow-up
- No blocking concerns

### 💬 Comment (no approval yet)
- Needs discussion
- Minor changes requested
- Want to see updates before approving

### 🚫 Request Changes
- Blocking issues found (security, bugs, breaking changes)
- Major refactoring needed
- Doesn't meet requirements

---

## 📚 Common Pitfalls to Watch For

### JavaScript/TypeScript
- Using `==` instead of `===`
- Not handling promise rejections
- Mutating props in React
- Forgetting to clean up useEffect
- Not validating user input

### Python
- Mutable default arguments
- Bare `except:` clauses
- Not closing file handles
- Using `is` for value comparison

### SQL/Database
- N+1 query problem
- Missing indexes on foreign keys
- No pagination for large datasets
- SQL injection vulnerabilities

### Security
- Credentials in code
- No input validation
- Trusting client-side checks only
- Weak password hashing
- Missing authentication checks

### Performance
- Loading all records without limit
- Nested loops on large datasets
- Unnecessary re-renders (React)
- Synchronous operations blocking UI

---

## 🤝 Giving Constructive Feedback

### Good Practices:
✅ "Consider extracting this logic into a separate function for reusability"  
✅ "This could be vulnerable to XSS. We should sanitize user input here"  
✅ "What happens if this API call fails? Should we add error handling?"  
✅ "Great use of the factory pattern here!"  

### Avoid:
❌ "This is wrong"  
❌ "Why did you do it this way?"  
❌ "This is bad"  
❌ Only negative feedback  

### Framework:
1. **Observation**: "I noticed that..."
2. **Impact**: "This could cause..."
3. **Suggestion**: "Consider..."
4. **Question** (if unsure): "What do you think about..."

---

**Version:** 1.0  
**Last Updated:** December 2025  
**Maintained By:** Development Team