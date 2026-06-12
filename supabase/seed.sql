insert into plans (code, name, price, display_order)
values
  ('basic', 'Basic', 99, 1),
  ('professional', 'Professional', 199, 2),
  ('executive', 'Executive', 399, 3)
on conflict (code) do nothing;

insert into features (code, description, category)
values
  ('pdf_download', 'Download resume as PDF', 'download'),
  ('basic_template', 'Access to basic resume template', 'template'),
  ('premium_template', 'Access to premium templates', 'template'),
  ('ai_summary', 'Generate AI professional summary', 'ai'),
  ('ai_experience', 'Improve work experience using AI', 'ai'),
  ('ai_skills', 'Generate AI skills suggestions', 'ai'),
  ('cover_letter', 'Generate AI cover letter', 'ai'),
  ('resume_score', 'View resume score and recommendations', 'analysis'),
  ('job_matching', 'Match resume to hiring opportunities', 'executive'),
  ('employer_outreach', 'Send outreach emails to employers', 'executive'),
  ('application_tracker', 'Track job applications', 'executive')
on conflict (code) do nothing;

insert into plan_features (plan_id, feature_id)
select p.id, f.id
from plans p
join features f on f.code in (
  'pdf_download',
  'basic_template'
)
where p.code = 'basic'
on conflict do nothing;

insert into plan_features (plan_id, feature_id)
select p.id, f.id
from plans p
join features f on f.code in (
  'pdf_download',
  'basic_template',
  'premium_template',
  'ai_summary',
  'ai_experience',
  'ai_skills',
  'cover_letter',
  'resume_score'
)
where p.code = 'professional'
on conflict do nothing;

insert into plan_features (plan_id, feature_id)
select p.id, f.id
from plans p
join features f on f.code in (
  'pdf_download',
  'basic_template',
  'premium_template',
  'ai_summary',
  'ai_experience',
  'ai_skills',
  'cover_letter',
  'resume_score',
  'job_matching',
  'employer_outreach',
  'application_tracker'
)
where p.code = 'executive'
on conflict do nothing;