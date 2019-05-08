/*
 * Copyright 2019 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {MithrilViewComponent} from "jsx/mithril-component";
import * as m from "mithril";
import {Stage} from "models/pipeline_configs/stage";
import {Form, FormBody} from "views/components/forms/form";
import {TextField} from "views/components/forms/input_fields";
import {SwitchBtn} from "views/components/switch/index";
import {TooltipSize} from "views/components/tooltip";
import * as Tooltip from "views/components/tooltip";
import {AdvancedSettings} from "views/pages/pipelines/advanced_settings";
import * as css from "./components.scss";

interface Attrs {
  stage: Stage;
}

export class StageEditor extends MithrilViewComponent<Attrs> {
  view(vnode: m.Vnode<Attrs>) {
    const stage = vnode.attrs.stage;

    return <FormBody>
      <Form last={true} compactForm={true}>
        <TextField label="Stage Name" placeholder="e.g., Test-and-Report" required={true} property={stage.name} errorText={stage.errors().errorsForDisplay("name")}/>
        <AdvancedSettings>

          <SwitchBtn label={<div class={css.switchLabelText}>
            Automatically run this stage on upstream changes
            <Tooltip.Help size={TooltipSize.medium} content="Enabling this means that this stage will automatically run when code is updated or its preceding or upstream stage passes. Disabling this means you must trigger this stage manually."/>
          </div>} field={stage.approval().state} small={true}/>
        </AdvancedSettings>
      </Form>
    </FormBody>;
  }
}
